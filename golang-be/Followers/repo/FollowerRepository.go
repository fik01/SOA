package repo

import (
	"errors"
	"followers/model"

	"gorm.io/gorm"
)

type FollowerRepository struct {
	DatabaseConnection *gorm.DB
}

func NewFollowerRepository(db *gorm.DB) *FollowerRepository {
	return &FollowerRepository{
		DatabaseConnection: db,
	}
}

func (repo *FollowerRepository) CreateFollower(follower *model.Follower) error {
	dbResult := repo.DatabaseConnection.Create(follower)
	if dbResult.Error != nil {
		return dbResult.Error
	}
	return nil
}

func (r *FollowerRepository) DeleteFollower(followerID, followedID int64) error {

	result := r.DatabaseConnection.Where("follower_id = ? AND followed_id = ?", followerID, followedID).Delete(&model.Follower{})

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("follower not found")
	}

	return nil
}

func (r *FollowerRepository) GetFollowings(userID int64) ([]model.Follower, error) {
	var followings []model.Follower

	result := r.DatabaseConnection.Where("follower_id = ?", userID).Find(&followings)
	if result.Error != nil {
		return followings, result.Error
	}

	return followings, nil
}
