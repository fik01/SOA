package db

import (
	"gorm.io/gorm"
	"log"
	"tours/model"
)

func AutoMigrate(db *gorm.DB) {
	err := db.AutoMigrate(&model.TourKeyPoint{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}
	err = db.AutoMigrate(&model.TourDuration{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}
	err = db.AutoMigrate(&model.Tour{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}
	err = db.AutoMigrate(&model.Rating{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}
}