export interface Message{
    id?: number
    content: string,
    creationTime: Date,
    senderId?: number,
    recipientId?: number,
    senderUsername: string,
    recipientUsername: string,
}