package config

import "os"

type Config struct {
	Address string
}

func GetConfig() Config {
	return Config{
		Address: os.Getenv("TOUR_SERVICE_ADDRESS"),
	}
}

func GetConnectionString() string {
	connectionString, isPresent := os.LookupEnv("DATABASE_URL")
	if isPresent {
		return connectionString
	} else {
		return "mongodb://root:jemta@localhost:27017"
	}
}

func GetPort() string {
	return ":8080"
}
