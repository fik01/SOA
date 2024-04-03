package config

import "os"

func GetConnectionString() string {
	connectionString, isPresent := os.LookupEnv("DATABASE_URL2")
	if isPresent {
		return connectionString
	} else {
		return "host=localhost user=postgres password=super dbname= port=5432 sslmode=disable"
	}
}

func GetPort() string {
	return ":8090"
}