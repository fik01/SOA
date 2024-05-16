package gRPCapp

import (
	"database-example/config"
	"database-example/db"
	"database-example/gRPCHandlers"
	"database-example/model"
	blog_service "database-example/proto/blog-service"
	"database-example/repo"
	"database-example/service"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"

	"go.mongodb.org/mongo-driver/mongo"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
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

	commentRepo := &repo.CRUDRepository[model.Comment]{
		DatabaseConnection: app.db,
		CollectionName:     "comments",
		PrimaryKeyField:    "Id",
	}
	CommentService :=  &service.CommentService{CommentRepo: commentRepo}

	blogRepo := &repo.CRUDRepository[model.BlogPage]{
		DatabaseConnection: app.db,
		CollectionName:     "blog_pages",
		PrimaryKeyField:    "Id",
	}
	BlogPageService :=  &service.BlogService{BlogRepo: blogRepo}

	var serverTourHandler = gRPCHandlers.BlogHandler{
		BlogPageService:    BlogPageService,
		CommentService: CommentService,
	}

	blog_service.RegisterBlogServiceServer(grpcServer, &serverTourHandler)

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
