package db

import (
	"database-example/config"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {
	db, err := gorm.Open(postgres.Open(config.GetConnectionString()), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	return db
}