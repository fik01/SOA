import { Challenge } from "../../administration/model/challenge.model";

export class ChallengeExecution {
    id?: number;
    touristId: number;
    challenge?: Challenge;
    challengeId?: number;
    latitude: number;
    longitude: number;
    activationTime: Date;
    completionTime?: Date;
    isCompleted: boolean;
}
  