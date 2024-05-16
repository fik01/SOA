package gRPCHandlers

import (
	"context"
	"database-example/model"
	blog_service "database-example/proto/blog-service"
	"errors"
)

func (server *BlogHandler) CreateBlog(ctx context.Context, req *blog_service.BlogPage) (*blog_service.StatusCodeResponse, error) {
	blog := protoToModel(req)

	if blog == nil {
		return nil, errors.New("Error while parsing blog!")
	}

	err := server.BlogPageService.Create(ctx, blog)

	if err != nil {
		return nil, errors.New("Error while creating blog!")
	}

	resp := &blog_service.StatusCodeResponse{}
	resp.StatusCode = 200

	return resp, nil
}

func (server *BlogHandler) GetEquipment(ctx context.Context, req *blog_service.EmptyRequest) (*blog_service.GetAllBlogsResponse, error) {
	blogs, err := server.BlogPageService.GetAll(ctx);
	if err != nil {
		return nil, errors.New("Error while getting blogs: " + err.Error())
	}

	resp := &blog_service.GetAllBlogsResponse{}
	resp.BlogPage = modelToProtoMulti(blogs);

	return resp, nil
}


func modelToProtoMulti(model *[]model.BlogPage) []*blog_service.BlogPage {
	var proto []*blog_service.BlogPage
	for _, m := range *model {
		proto = append(proto, &blog_service.BlogPage{
			Id:               int32(m.Id),
			UserId:           int32(m.UserId),
			Title:         	  m.Title,
			Description:      m.Description,
			Status:           int32(m.Status),
			RatingSum:        int32(m.RatingSum),
		})
	}
	return proto
}

func modelToProto(m *model.BlogPage) *blog_service.BlogPage {
	var proto = &blog_service.BlogPage{
		Id:               int32(m.Id),
		UserId:           int32(m.UserId),
		Title:         	  m.Title,
		Description:      m.Description,
		Status:           int32(m.Status),
		RatingSum:        int32(m.RatingSum),
	}
	return proto
}

func protoToModel(req *blog_service.BlogPage) *model.BlogPage {
	if req != nil {
		modelRating := &model.BlogPage{

			Id:       int(req.GetId()),
			UserId:   int(req.GetUserId()),
			Title:    req.GetTitle(),
			Description:     req.GetDescription(),
			Status:  int(req.GetStatus()),
			RatingSum:  int(req.GetRatingSum()),

		}
		return modelRating
	}
	return nil
}
