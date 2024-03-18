package db

import (
	"database-example/model"
	"log"

	"gorm.io/gorm"
)

func AutoMigrate(db *gorm.DB) {
	err := db.AutoMigrate(&model.BlogPage{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}
	err = db.AutoMigrate(&model.Comment{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}
}