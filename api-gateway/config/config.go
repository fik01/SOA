package config

import "os"

type Config struct {
	Address            string
	TourServiceAddress string
	EncounterServiceAddress string
	StakeholdersServiceAddress string
}

func GetConfig() Config {
	return Config{
		EncounterServiceAddress: os.Getenv("ENCOUNTER_SERVICE_ADDRESS"),
		TourServiceAddress:         os.Getenv("TOUR_SERVICE_ADDRESS"),
		StakeholdersServiceAddress: os.Getenv("STAKEHOLDERS_SERVICE_ADDRESS"),
		Address:                    os.Getenv("GATEWAY_ADDRESS"),
	}
}
