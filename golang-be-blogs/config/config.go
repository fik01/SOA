package config

import "os"

func GetConnectionString() string {
	connectionString, isPresent := os.LookupEnv("DATABASE_URL2")
	if isPresent {
		return connectionString
	} else {
		return "mongodb://localhost:27017/blogs"
	}
}

func GetPort() string {
	return ":8090"
}