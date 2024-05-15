package config

import "os"

type Config struct {
	Address            string
	TourServiceAddress string
	EncounterServiceAddress string
}

func GetConfig() Config {
	return Config{
		EncounterServiceAddress: os.Getenv("ENCOUNTER_SERVICE_ADDRESS"),
		TourServiceAddress: os.Getenv("TOUR_SERVICE_ADDRESS"),
		Address:            os.Getenv("GATEWAY_ADDRESS"),
	}
}
