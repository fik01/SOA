package service

import (
	"followers/model"
	"followers/repo"
)

type FollowerService struct {
	CRUDRepository *repo.CRUDRepository[model.Follower]
}

func (s *FollowerService) CreateFollower(follower model.Follower) error {
	err := s.CRUDRepository.Create(&follower)
	if err != nil {
		return err
	}
	return nil
}
