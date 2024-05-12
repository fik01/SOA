package service

import (
	"tours/model"
	"tours/repo"
)

type EquipmentService struct {
	EquipmentRepo *repo.CRUDRepository[model.Equipment]
}

func (service *EquipmentService) Get() ([]*model.Equipment, error) {
	equipment, err := service.EquipmentRepo.GetAll()
	if err != nil {
		return nil, err
	}
	return equipment, nil
}

func (service *EquipmentService) GetById(id int) (*model.Equipment, error) {
	equipment, err := service.EquipmentRepo.GetById(id)
	if err != nil {
		return nil, err
	}
	return equipment, nil
}

func (service *EquipmentService) Create(equipment *model.Equipment) error {
	err := service.EquipmentRepo.Create(equipment)
	if err != nil {
		return err
	}
	return nil
}

func (service *EquipmentService) Update(equipment *model.Equipment) error {
	err := service.EquipmentRepo.Update(equipment)
	if err != nil {
		return err
	}
	return nil
}

func (service *EquipmentService) Delete(id int) error {
	err := service.EquipmentRepo.Delete(id)
	if err != nil {
		return err
	}
	return nil
}
