package main

import (
	"api-gateway/config"
	"api-gateway/middleware"
	stakeholders_service "api-gateway/proto/stakeholders-service"
	tour_service "api-gateway/proto/tour-service"
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/gin-gonic/gin"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/zsais/go-gin-prometheus"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/jaeger"
	"go.opentelemetry.io/otel/exporters/stdout/stdouttrace"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/resource"
	"go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.23.0"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

const serviceName = "api-gateway"

var tp *trace.TracerProvider

func initTracer() (*trace.TracerProvider, error) {
	// Ukoliko je definisana JAEGER_ENDPOINT env var, intanciraj JagerTracer koji šalje trace-ove Jaeger-u,
	// u suprotnom instanciraj FileTracer koji upisuje trace-ove u json fajl
	url := os.Getenv("JAEGER_ENDPOINT")
	if len(url) > 0 {
		return initJaegerTracer(url)
	} else {
		return initFileTracer()
	}
}

func initFileTracer() (*trace.TracerProvider, error) {
	log.Println("Initializing tracing to traces.json")
	f, err := os.Create("traces.json")
	if err != nil {
		return nil, err
	}
	exporter, err := stdouttrace.New(
		stdouttrace.WithWriter(f),
		stdouttrace.WithPrettyPrint(),
	)
	if err != nil {
		return nil, err
	}
	return trace.NewTracerProvider(
		trace.WithBatcher(exporter),
		trace.WithSampler(trace.AlwaysSample()),
	), nil
}

func initJaegerTracer(url string) (*trace.TracerProvider, error) {
	log.Printf("Initializing tracing to Jaeger for service: %s at %s\n", serviceName, url)
	log.Printf("Initializing tracing to jaeger at %s\n", url)
	exporter, err := jaeger.New(jaeger.WithCollectorEndpoint(jaeger.WithEndpoint(url)))
	if err != nil {
		return nil, err
	}
	return trace.NewTracerProvider(
		trace.WithBatcher(exporter),
		trace.WithResource(resource.NewWithAttributes(
			semconv.SchemaURL,
			semconv.ServiceNameKey.String(serviceName),
		)),
	), nil
}

func main() {
	var err error
	tp, err = initTracer()
	if err != nil {
		log.Fatalf("failed to initialize tracer: %v", err)
	}
	defer func() {
		if err := tp.Shutdown(context.Background()); err != nil {
			log.Fatalf("failed to shut down tracer: %v", err)
		}
	}()

	otel.SetTracerProvider(tp)
	otel.SetTextMapPropagator(propagation.NewCompositeTextMapPropagator(propagation.TraceContext{}, propagation.Baggage{}))

	tracer := otel.Tracer(serviceName)

	cfg := config.GetConfig()

	// Setup Gin Router
	router := gin.New()
	p := ginprometheus.NewPrometheus("gin")
	p.Use(router)
	router.Use(otelgin.Middleware(serviceName))

	// gRPC Gateway
	gwmux := setupGateway(&cfg)
	//router.Any("/*any", gin.WrapH(gwmux))

	httpServer := &http.Server{
		Addr:    cfg.Address,
		Handler: middleware.TracingMiddleware(tracer, router),
	}

	log.Println("Serving gRPC-Gateway on http://0.0.0.0:44333")

	go func() {
		if err := httpServer.ListenAndServe(); err != nil {
			log.Fatal("server error: ", err)
		}
	}()

	stopCh := make(chan os.Signal)
	signal.Notify(stopCh, syscall.SIGTERM)

	<-stopCh

	if err := httpServer.Close(); err != nil {
		log.Fatalln("error while stopping server: ", err)
	}
}

func setupGateway(cfg *config.Config)  *runtime.ServeMux {

	gwmux := runtime.NewServeMux()

	// Tours Gateway
	conn, err := grpc.DialContext(
		context.Background(),
		cfg.TourServiceAddress,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock(),
	)
	if err != nil {
		log.Fatalln("Failed to dial server:", err)
	}

	client := tour_service.NewTourServiceClient(conn)
	err = tour_service.RegisterTourServiceHandlerClient(
		context.Background(),
		gwmux,
		client,
	)

	if err != nil {
		log.Fatalln("Failed to register gateway:", err)
	}

	//Stakeholders gateway
	connStake, err := grpc.DialContext(
		context.Background(),
		cfg.StakeholdersServiceAddress,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock(),
	)
	if err != nil {
		log.Fatalln("Failed to dial server:", err)
	}

	clientStake := stakeholders_service.NewStakeholdersServiceClient(connStake)
	err = stakeholders_service.RegisterStakeholdersServiceHandlerClient(
		context.Background(),
		gwmux,
		clientStake,
	)

	if err != nil {
		log.Fatalln("Failed to register gateway:", err)
	}

	return gwmux
}

func addCorsMiddleware(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		handler.ServeHTTP(w, r)
	})
}
