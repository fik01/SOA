package app

import (
	"go.mongodb.org/mongo-driver/mongo"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"log"
	"net"
	"os"
	"os/signal"
	"stakeholders/config"
	"stakeholders/db"
	"stakeholders/handler"
	"stakeholders/model"
	stakeholders_service "stakeholders/proto/stakeholders-service"
	"stakeholders/repo"
	"stakeholders/service"
	"syscall"
)

type App struct {
	db *mongo.Database
}

func Run() {
	app := new(App)

	app.db = db.Connect()
	cfg := config.GetConfig()

	listener, err := net.Listen("tcp", cfg.Address)
	if err != nil {
		log.Fatalln(err)
	}
	defer func(listener net.Listener) {
		err := listener.Close()
		if err != nil {
			log.Fatal(err)
		}
	}(listener)

	grpcServer := initGrpc()

	userRepo := &repo.CRUDRepository[model.User]{
		DatabaseConnection: app.db,
		CollectionName:     "stakeholders",
		PrimaryKeyField:    "_id",
	}
	authService := &service.AuthenticationService{UserRepo: userRepo}
	authHandler := &handler.StakeholdersHandler{
		AuthService: authService,
	}

	stakeholders_service.RegisterStakeholdersServiceServer(grpcServer, authHandler)

	go func() {
		log.Println("Serving gRPC on " + cfg.Address)
		if err := grpcServer.Serve(listener); err != nil {
			log.Fatal("server error: ", err)
		}
	}()

	stopCh := make(chan os.Signal)
	signal.Notify(stopCh, syscall.SIGTERM)

	<-stopCh

	grpcServer.Stop()
}

func initGrpc() *grpc.Server {
	grpcServer := grpc.NewServer()
	reflection.Register(grpcServer)
	return grpcServer
}
