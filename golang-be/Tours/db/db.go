package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"tours/config"
)

func Connect() *gorm.DB {
	db, err := gorm.Open(postgres.Open(config.GetConnectionString()), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	return db
}
