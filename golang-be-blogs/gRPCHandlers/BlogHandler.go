package gRPCHandlers

import (
	blog_service "database-example/proto/blog-service"
	"database-example/service"
)

type BlogHandler struct {
	blog_service.UnimplementedBlogServiceServer
	CommentService    *service.CommentService
	BlogPageService *service.BlogService
}
