export interface BlogPage{
    id?: number;
    title: string;
    description: string;
    status:number;
    userId:number;
    username:string;
    ratingSum:number;
    ratings:Rating[];
}

export interface Rating{
    userId:number;
    creationDate:string;
    ratingValue:number;
}
