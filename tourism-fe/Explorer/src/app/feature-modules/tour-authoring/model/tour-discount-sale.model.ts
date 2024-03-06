export interface Sales {
    id?:number;
    startDate: Date;
    endDate: Date;
    discountPercentage: number;
    tourId?: number
}
