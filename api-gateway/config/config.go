package config

import "os"

type Config struct {
	Address            string
	TourServiceAddress string
}

func GetConfig() Config {
	return Config{
		TourServiceAddress: os.Getenv("TOUR_SERVICE_ADDRESS"),
		Address:            os.Getenv("GATEWAY_ADDRESS"),
	}
}
