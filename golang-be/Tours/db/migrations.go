package db

import (
	"log"
	"tours/model"

	"gorm.io/gorm"
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
	err = db.AutoMigrate(&model.Equipment{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}
	err = db.AutoMigrate(&model.Position{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}

	err = db.AutoMigrate(&model.TourProblemMessage{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}
	err = db.AutoMigrate(&model.TourProblem{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}
}
