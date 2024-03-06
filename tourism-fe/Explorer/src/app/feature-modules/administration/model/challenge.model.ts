export interface Challenge {
    id?: number,
    creatorId?: number,
    keyPointId?: number,
    experiencePoints?: number,
    name?: string,
    description?: string,
    status?: ChallengeStatus,
    type?: ChallengeType,
    latitude: number,
    longitude: number,
    image?: string,
    latitudeImage?: number,
    longitudeImage?: number,
    range?: number,
    requiredAttendance?: number
}

export enum ChallengeStatus {
    Draft,
    Active,
    Archived
}

export enum ChallengeType {
    Social,
    Location,
    Misc
}