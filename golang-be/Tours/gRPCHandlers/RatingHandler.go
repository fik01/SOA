package gRPCHandlers

import (
	"context"
	"errors"
	"google.golang.org/protobuf/types/known/timestamppb"
	"time"
	"tours/model"
	tour_service "tours/proto/tour-service"
)

func (server *TourHandler) GetRatingByTourId(ctx context.Context, req *tour_service.GetRatingTourIdRequest) (*tour_service.GetRatingResponse, error) {
	var rating, err = server.RatingService.GetByTourId(ctx, int(req.GetTourId()))
	if err != nil {
		return nil, errors.New("Error while getting ratings: " + err.Error())
	}

	resp := &tour_service.GetRatingResponse{}

	resp.Rating = modelToProtoMulti(rating)

	return resp, nil
}

func (server *TourHandler) CreateRating(ctx context.Context, req *tour_service.Rating) (*tour_service.StatusCodeResponse, error) {
	rating := protoToModel(req)

	if rating == nil {
		return nil, errors.New("Error while parsing rating!")
	}

	err := server.RatingService.Create(ctx, rating)

	if err != nil {
		return nil, errors.New("Error while creating rating!")
	}

	resp := &tour_service.StatusCodeResponse{}
	resp.StatusCode = 200

	return resp, nil
}

func (server *TourHandler) UpdateRating(ctx context.Context, req *tour_service.Rating) (*tour_service.StatusCodeResponse, error) {
	rating := protoToModel(req)

	if rating == nil {
		return nil, errors.New("Error while parsing rating!")
	}

	err := server.RatingService.Update(ctx, rating)

	if err != nil {
		return nil, errors.New("Error while updating rating!")
	}

	resp := &tour_service.StatusCodeResponse{}
	resp.StatusCode = 200

	return resp, nil
}

func (server *TourHandler) GetRatingById(ctx context.Context, req *tour_service.GetRatingIdRequest) (*tour_service.GetRatingResponse, error) {
	var rating, err = server.RatingService.GetByTourId(ctx, int(req.GetId()))
	if err != nil {
		return nil, errors.New("Error while getting ratings: " + err.Error())
	}

	resp := &tour_service.GetRatingResponse{}

	resp.Rating = modelToProtoMulti(rating)

	return resp, nil
}

func (server *TourHandler) GetRatingByUserAndTourId(ctx context.Context, req *tour_service.GetRatingUserAndTourRequest) (*tour_service.Rating, error) {
	var rating, err = server.RatingService.GetByTourIdAndPersonId(ctx, int(req.GetTourId()), int(req.GetPersonId()))
	if err != nil {
		return nil, errors.New("Error while getting ratings: " + err.Error())
	}

	resp := &tour_service.Rating{}

	resp = modelToProto(rating)

	return resp, nil
}

func modelToProtoMulti(model []*model.Rating) []*tour_service.Rating {
	var proto []*tour_service.Rating
	for _, m := range model {
		proto = append(proto, &tour_service.Rating{
			Id:               int32(m.ID),
			TourId:           int32(m.TourID),
			PersonId:         int32(m.PersonID),
			Mark:             int32(m.Mark),
			Comment:          m.Comment,
			DateOfVisit:      timestamppb.New(m.DateOfVisit),
			DateOfCommenting: timestamppb.New(m.DateOfCommenting),
			Images:           m.Images,
		})
	}
	return proto
}

func modelToProto(model *model.Rating) *tour_service.Rating {
	var proto = &tour_service.Rating{
		Id:               int32(model.ID),
		TourId:           int32(model.TourID),
		PersonId:         int32(model.PersonID),
		Mark:             int32(model.Mark),
		Comment:          model.Comment,
		DateOfVisit:      timestamppb.New(model.DateOfVisit),
		DateOfCommenting: timestamppb.New(model.DateOfCommenting),
		Images:           model.Images,
	}
	return proto
}

func protoToModel(req *tour_service.Rating) *model.Rating {
	if req != nil {
		modelRating := &model.Rating{
			// Map each field from the Protocol Buffers message to the corresponding field in your struct
			ID:       int(req.GetId()),
			TourID:   int(req.GetTourId()),
			PersonID: int(req.GetPersonId()),
			Mark:     int(req.GetMark()),
			Comment:  req.GetComment(),

			DateOfVisit:      time.Unix(req.GetDateOfVisit().GetSeconds(), int64(req.GetDateOfVisit().GetNanos())),
			DateOfCommenting: time.Unix(req.GetDateOfCommenting().GetSeconds(), int64(req.GetDateOfCommenting().GetNanos())),
			Images:           req.GetImages(),
		}
		return modelRating
	}
	return nil
}
