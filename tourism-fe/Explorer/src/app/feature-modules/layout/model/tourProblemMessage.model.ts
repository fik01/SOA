export interface TourProblemMessage{
    senderId: number;
    recipientId: number;
    creationTime: Date;
    description: string;
    senderName: string;
    isRead: boolean;
}
