package service

import (
	"followers/model"
	"followers/repo"
)

type FollowerService struct {
	FollowerRepository *repo.FollowerRepository
}

func (s *FollowerService) CreateFollower(follower model.Follower) error {
	err := s.FollowerRepository.CreateFollower(&follower)
	if err != nil {
		return err
	}
	return nil
}

func (s *FollowerService) DeleteFollower(followerID, followedID int64) error {

	err := s.FollowerRepository.DeleteFollower(followerID, followedID)
	if err != nil {
		return err
	}

	return nil
}

func (s *FollowerService) GetFollowings(userID int64) ([]model.Follower, error) {
	followings, err := s.FollowerRepository.GetFollowings(userID)
	if err != nil {
		return nil, err
	}
	return followings, nil
}
