package config

func GetConnectionString() string {
	return "host=localhost user=postgres password=super dbname=test_tour port=5432 sslmode=disable"
}

func GetPort() string {
	return ":8080"
}
