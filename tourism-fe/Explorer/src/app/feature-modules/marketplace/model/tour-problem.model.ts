export interface TourProblem {
    id?: number;
    touristId: number;
    tourId: number;
    category: TourProblemCategory | null;
    priority: TourProblemPriority | null;
    description: string;
    time: Date;
    isSolved: boolean;
    authorUsername: string
    touristUsername: string;
    messages: Message[];
    tourName?: string;
}

export interface Message{
    senderId: number;
    recipientId: number;
    creationTime: Date;
    description: string;
    senderName: string;
    isRead: boolean;
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