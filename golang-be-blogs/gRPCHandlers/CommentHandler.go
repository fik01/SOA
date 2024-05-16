package gRPCHandlers

import (
	"context"
	"database-example/model"
	blog_service "database-example/proto/blog-service"
	"errors"
	"time"

	"google.golang.org/protobuf/types/known/timestamppb"
)

func (server *BlogHandler) CreateRating(ctx context.Context, req *blog_service.Comment) (*blog_service.StatusCodeResponse, error) {
	rating := commentProtoToModel(req)

	if rating == nil {
		return nil, errors.New("Error while parsing comment!")
	}

	err := server.CommentService.Create(ctx, rating)

	if err != nil {
		return nil, errors.New("Error while creating comment!")
	}

	resp := &blog_service.StatusCodeResponse{}
	resp.StatusCode = 200

	return resp, nil
}

func (server *BlogHandler) UpdateRating(ctx context.Context, req *blog_service.Comment) (*blog_service.StatusCodeResponse, error) {
	comment := commentProtoToModel(req)

	if comment == nil {
		return nil, errors.New("Error while parsing comment!")
	}

	err := server.CommentService.Update(ctx, comment)

	if err != nil {
		return nil, errors.New("Error while updating comment!")
	}

	resp := &blog_service.StatusCodeResponse{}
	resp.StatusCode = 200

	return resp, nil
}

func (server *BlogHandler) DeleteEquipment(ctx context.Context, req *blog_service.DeleteCommentRequest) (*blog_service.StatusCodeResponse, error) {
	err := server.CommentService.DeleteById(ctx,int(req.GetId()))
	if err != nil {
		return nil, errors.New("Error while deleting coment: " + err.Error())
	}
	resp := &blog_service.StatusCodeResponse{}
	resp.StatusCode = 200
	return resp, nil
}

func (server *BlogHandler) GetByBlogId(ctx context.Context, req *blog_service.GetByBlogIdRequest) (*blog_service.GetByBlogIdResponse, error) {
	var comments, err = server.CommentService.GetByBlogId(ctx, int(req.GetId()))
	if err != nil {
		return nil, errors.New("Error while getting comments: " + err.Error())
	}

	resp := &blog_service.GetByBlogIdResponse{}

	resp.Comment = commentModelToProtoMulti(comments);

	return resp, nil
}

func commentModelToProtoMulti(model *[]model.Comment) []*blog_service.Comment {
	var proto []*blog_service.Comment
	for _, m := range *model {
		proto = append(proto, &blog_service.Comment{
			Id:          int32(m.Id),
			UserId:      int32(m.UserId),
			BlogId:       int32(m.BlogId),
			Description: m.Description,
			CreationDate:      timestamppb.New(m.CreationDate),
			LastEditDate:   timestamppb.New(m.LastEditDate),
			Usernam: m.Username,
			ProfilePic: m.ProfilePic,
		})
	}
	return proto
}

func commentMToProto(m *model.Comment) *blog_service.Comment {
	var proto = &blog_service.Comment{
		Id:          int32(m.Id),
			UserId:      int32(m.UserId),
			BlogId:       int32(m.BlogId),
			Description: m.Description,
			CreationDate:      timestamppb.New(m.CreationDate),
			LastEditDate:   timestamppb.New(m.LastEditDate),
			ProfilePic: m.ProfilePic,
			Usernam: m.Username,
	}
	return proto
}

func commentProtoToModel(req *blog_service.Comment) *model.Comment {
	if req != nil {
		modelRating := &model.Comment{

			Id:          int(req.GetId()),
			UserId:      int(req.GetUserId()),
			BlogId:       int(req.GetBlogId()),
			Description: req.GetDescription(),
			CreationDate:      time.Unix(req.GetCreationDate().GetSeconds(), int64(req.GetCreationDate().GetNanos())),
			LastEditDate:  time.Unix(req.GetLastEditDate().GetSeconds(), int64(req.GetLastEditDate().GetNanos())),
			ProfilePic: req.ProfilePic,
			Username: req.Usernam,
		}
		return modelRating
	}
	return nil
}