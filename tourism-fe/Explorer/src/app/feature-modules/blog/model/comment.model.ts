export interface Comment {
    id?: number;
    userId?: number;
    username: string;
    profilePic: string;
    creationDate: string;
    description: string;
    lastEditDate: string;
    blogId?: number;
}