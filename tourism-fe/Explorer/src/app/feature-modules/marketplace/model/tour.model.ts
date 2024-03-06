export interface Tour {
    id?: number;
    name: string;
    description: string;
    difficulty: string;
    tags: string;
    status: string;
    price: number;
    authorId?: number;
    equipment: number[];
}