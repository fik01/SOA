import { Message } from "../../marketplace/model/tour-problem.model";

export interface TourProblem {
    id?: number;
    touristId?: number;
    tourId?: number;
    category: TourProblemCategory | null;
    priority: TourProblemPriority | null;
    description: string;
    time: Date;
    isSolved: boolean;
    authorUsername:string;
    touristUsername:string;
    deadline: Date|null;
    messages: Message[];
}
export enum TourProblemPriority {
    LOW,
    MEDIUM,
    HIGH
}

export enum TourProblemCategory {
    BOOKING,
    ITINERARY,
    PAYMENT,
    TRANSPORTATION,
    GUIDE_SERVICES,
    OTHER
}