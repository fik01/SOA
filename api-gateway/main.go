package main

import (
	"api-gateway/config"
	"api-gateway/middleware"
	stakeholders_service "api-gateway/proto/stakeholders-service"
	tour_service "api-gateway/proto/tour-service"
	"api-gateway/utils"
	"context"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

func main() {

	cfg := config.GetConfig()

	// Http Server
	gwServer := &http.Server{
		Addr:    cfg.Address,
		Handler: setupGateway(&cfg),
	}

	log.Println("Serving gRPC-Gateway on http://0.0.0.0:44333")

	go func() {
		if err := gwServer.ListenAndServe(); err != nil {
			log.Fatal("server error: ", err)
		}
	}()

	stopCh := make(chan os.Signal)
	signal.Notify(stopCh, syscall.SIGTERM)

	<-stopCh

	if err := gwServer.Close(); err != nil {
		log.Fatalln("error while stopping server: ", err)
	}

}

func setupGateway(cfg *config.Config) http.Handler {

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

	return middleware.JwtMiddleware(addCorsMiddleware(gwmux), utils.GetProtectedPaths())
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
