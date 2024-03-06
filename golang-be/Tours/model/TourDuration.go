package model

type TransportationType int

type TourDuration struct {
	TimeInSeconds  int
	Transportation TransportationType
}

func NewTourDuration(timeInSeconds int, transpotation TransportationType) TourDuration {
	return TourDuration{TimeInSeconds: timeInSeconds, Transportation: transpotation}
}

const (
	Walking TransportationType = iota
	Bicycle
	Car
)
