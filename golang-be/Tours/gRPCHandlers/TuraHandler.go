package gRPCHandlers

import (
	"context"
	"errors"
	"time"
	"tours/model"
	tour_service "tours/proto/tour-service"

	"google.golang.org/protobuf/types/known/timestamppb"
)

func (server *TourHandler) CreateTour(ctx context.Context, req *tour_service.Tour) (*tour_service.Tour, error) {
	tour := tourProtoToModel(req)

	if tour == nil {
		return nil, errors.New("Error while parsing rating!")
	}

	newTour, err := server.TourSerice.Create(ctx, tour)

	if err != nil {
		return nil, errors.New("Error while creating rating!")
	}

	resp := tourModelToProto(newTour)

	return resp, nil
}

func (server *TourHandler) GetAll(ctx context.Context, req *tour_service.EmptyRequest) (*tour_service.GetToursResponse, error) {
	tours, err := server.TourSerice.GetAll(ctx)
	if err != nil {
		return nil, errors.New("Error while getting equipment: " + err.Error())
	}

	resp := &tour_service.GetToursResponse{}
	resp.Tours = getToursModelToProto(tours)

	return resp, nil
}

func (server *TourHandler) GetTourByAuthorId(ctx context.Context, req *tour_service.AuthorRequest) (*tour_service.TourPaged, error) {
	tours, err := server.TourSerice.GetAllByAuthorID(ctx, int(req.AuthorId))
	if err != nil {
		return nil, errors.New("Error while getting equipment: " + err.Error())
	}

	resp := &tour_service.TourPaged{}
	resp.TotalCount = 1
	resp.Tours = getToursModelToProto(tours)
	return resp, nil
}

func (server *TourHandler) UpdateTour(ctx context.Context, req *tour_service.Tour) (*tour_service.Tour, error) {
	err := server.TourSerice.Update(ctx, tourProtoToModel(req))
	if err != nil {
		return nil, errors.New("Error while getting equipment: " + err.Error())
	}

	return req, err
}

func tourProtoToModel(req *tour_service.Tour) *model.Tour {
	if req != nil {
		modelTour := &model.Tour{
			Id:            int(req.GetId()),
			Name:          req.GetName(),
			Description:   req.GetName(),
			Price:         req.GetPrice(),
			Difficulty:    model.TourDifficulty(req.GetDifficulty()),
			Tags:          req.GetTags(),
			Equipment:     req.GetEquipment(),
			Status:        model.TourStatus(req.GetStatus()),
			AuthorID:      int(req.GetAuthorID()),
			DistanceInKm:  req.GetDistanceInKm(),
			ArchivedDate:  time.Unix(req.GetArchivedDate().GetSeconds(), int64(req.GetArchivedDate().GetNanos())),
			PublishedDate: time.Unix(req.GetPublishedDate().GetSeconds(), int64(req.GetPublishedDate().GetNanos())),
			Image:         req.GetImage(),
			KeyPoints:     getkeyPointsProtoToModel(req.GetKeyPoints()),
			Durations:     getDurationsToModel(req.GetDurations()),
		}
		return modelTour
	}
	return nil
}
func getkeyPointsProtoToModel(tkpList []*tour_service.TourKeyPoint) []model.TourKeyPoint {
	var modelKeyPoints []model.TourKeyPoint

	for _, tkp := range tkpList {
		modelKeyPoint := keyPointsProtoToModel(tkp)
		modelKeyPoints = append(modelKeyPoints, modelKeyPoint)
	}

	return modelKeyPoints
}

func keyPointsProtoToModel(tkp *tour_service.TourKeyPoint) model.TourKeyPoint {
	modelRating := model.TourKeyPoint{
		Id:             int(tkp.GetId()),
		Name:           tkp.GetName(),
		Description:    tkp.GetDescription(),
		Longitude:      tkp.GetLongitude(),
		Latitude:       tkp.GetLatitude(),
		Image:          tkp.GetImage(),
		TourID:         int(tkp.GetTourId()),
		Secret:         tkp.GetSecret(),
		PositionInTour: int(tkp.GetPositionInTour()),
		PublicPointID:  int(tkp.GetPublicPointID()),
	}

	return modelRating
}

func getDurationsToModel(durations []*tour_service.TourDuration) []model.TourDuration {
	var modelDurations []model.TourDuration

	for _, dur := range durations {
		modelDuration := durationProtoToModel(dur)
		modelDurations = append(modelDurations, modelDuration)
	}

	return modelDurations
}

func durationProtoToModel(dur *tour_service.TourDuration) model.TourDuration {
	modelRating := model.TourDuration{
		Id:             int(dur.GetId()),
		TourID:         int(dur.GetTourID()),
		TimeInSeconds:  int(dur.GetTimeInSeconds()),
		Transportation: model.TransportationType(dur.GetTransportation()),
	}

	return modelRating
}

func tourModelToProto(model *model.Tour) *tour_service.Tour {
	var proto = &tour_service.Tour{
		Id:            int32(model.Id),
		Name:          model.Name,
		Description:   model.Description,
		Price:         model.Price,
		Difficulty:    tour_service.TourDifficulty(model.Difficulty),
		Tags:          model.Tags,
		Equipment:     model.Equipment,
		Status:        tour_service.TourStatus(model.Status),
		AuthorID:      int32(model.AuthorID),
		DistanceInKm:  model.DistanceInKm,
		ArchivedDate:  timestamppb.New(model.ArchivedDate),
		PublishedDate: timestamppb.New(model.PublishedDate),
		Image:         model.Image,
		KeyPoints:     getkeyPointsModelToProto(model.KeyPoints),
		Durations:     getDurationsToProto(model.Durations),
	}
	return proto
}

func getToursModelToProto(tourList []model.Tour) []*tour_service.Tour {
	var modelTours []*tour_service.Tour

	for _, tkp := range tourList {
		modelTour := tourModelToProto(&tkp)
		modelTours = append(modelTours, modelTour)
	}

	return modelTours
}

func keyPointModelToProto(model model.TourKeyPoint) *tour_service.TourKeyPoint {
	var proto = &tour_service.TourKeyPoint{
		Id:             int32(model.Id),
		Name:           model.Name,
		Description:    model.Description,
		Longitude:      model.Longitude,
		Latitude:       model.Latitude,
		Image:          model.Image,
		TourId:         int32(model.TourID),
		Secret:         model.Secret,
		PositionInTour: int32(model.PositionInTour),
		PublicPointID:  int32(model.PublicPointID),
	}
	return proto
}
func getkeyPointsModelToProto(tkpList []model.TourKeyPoint) []*tour_service.TourKeyPoint {
	var modelKeyPoints []*tour_service.TourKeyPoint

	for _, tkp := range tkpList {
		modelKeyPoint := keyPointModelToProto(tkp)
		modelKeyPoints = append(modelKeyPoints, modelKeyPoint)
	}

	return modelKeyPoints
}

func durationsModelToProto(model model.TourDuration) *tour_service.TourDuration {
	var proto = &tour_service.TourDuration{
		Id:             int32(model.Id),
		TourID:         int32(model.TourID),
		TimeInSeconds:  int32(model.TimeInSeconds),
		Transportation: tour_service.TransportationType(model.Transportation),
	}
	return proto
}
func getDurationsToProto(durations []model.TourDuration) []*tour_service.TourDuration {
	var modelDurations []*tour_service.TourDuration

	for _, dur := range durations {
		modelDuration := durationsModelToProto(dur)
		modelDurations = append(modelDurations, modelDuration)
	}

	return modelDurations
}
