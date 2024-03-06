import { FollowerNotification } from "./followerNotification.model"

export interface Follower{
    id: number,
    followerId: number,
    followedId: number,
    notification: FollowerNotification
}