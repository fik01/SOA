export interface Person{
    id: number;
    userId: number;
    name: string;
    surname: string;
    email: string;
    profilePic: any;
    biography: string;
    motto: string;
    followed?: boolean;
    role?: string;
    latitude?: number;
    longitude?: number;
}