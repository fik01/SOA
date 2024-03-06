import { TourDuration } from "./tour-duration.model";
import { TourKeyPoints } from "./tour-keypoints.model";

export interface Tour {
    id?: number;
    name: string;
    description: string;
    difficulty: TourDifficulty;
    tags: string[];
    status: TourStatus;
    price: number;
    authorId?: number;
    equipment: number[];
    distanceInKm: number;
    archivedDate?: Date;
    publishedDate?: Date;
    durations: TourDuration[];
    keyPoints: TourKeyPoints[];
    selectedTransport?: number;
    canBeRated?: boolean;
    image?: string;
}

export enum TourDifficulty{
    Beginner,
    Intermediate,
    Advanced,
    Pro
}

export enum TourStatus {
    Draft,
    Published,
    Archived
}
