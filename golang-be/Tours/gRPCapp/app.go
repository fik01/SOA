package gRPCapp

import (
	"go.mongodb.org/mongo-driver/mongo"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"
	"tours/db"
	"tours/gRPCHandlers"
	"tours/model"
	tour_service "tours/proto/tour-service"
	"tours/repo"
	"tours/service"
)

type App struct {
	db *mongo.Database
}

func Run() {
	app := new(App)

	app.db = db.Connect()

	listener, err := net.Listen("tcp", ":8000")
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

	ratingRepo := &repo.RatingRepository{DatabaseConnection: app.db}
	ratingService := &service.RatingService{RatingRepo: ratingRepo}

	equipmentRepo := &repo.CRUDRepository[model.Equipment]{
		DatabaseConnection: app.db,
		CollectionName:     "equipment",
		PrimaryKeyField:    "Id",
	}
	equipmentService := &service.EquipmentService{EquipmentRepo: equipmentRepo}

	positionRepo := &repo.PositionRepository{DatabaseConnection: app.db}
	positionService := &service.PositionSimulatorService{PositionRepo: positionRepo}

	var serverTourHandler = gRPCHandlers.TourHandler{
		RatingService:    ratingService,
		EquipmentService: equipmentService,
		PositionService:  positionService,
	}
	tour_service.RegisterTourServiceServer(grpcServer, &serverTourHandler)

	go func() {
		log.Println("Serving gRPC on 0.0.0.0:8000")
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
