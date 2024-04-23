package config

import "os"

func GetConnectionString() string {
	connectionString, isPresent := os.LookupEnv("DATABASE_URL")
	if isPresent {
		return connectionString
	} else {
		return "mongodb://localhost:27017"
	}
}

func GetPort() string {
	return ":8080"
}
