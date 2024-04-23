package model

type TransportationType int

type TourDuration struct {
	Id             int                `bson:"_id"` // If you want to use a custom ID, use "_id" field name
	TourID         int                `bson:"tour_id"`
	TimeInSeconds  int                `bson:"time_in_seconds"`
	Transportation TransportationType `bson:"transportation"` // Assuming TransportationType is a string enum
}

func NewTourDuration(timeInSeconds int, transpotation TransportationType) TourDuration {
	return TourDuration{TimeInSeconds: timeInSeconds, Transportation: transpotation}
}

const (
	Walking TransportationType = iota
	Bicycle
	Car
)
