export interface Coupon {
    id?: number;
    code: string;
    discount: number;
    expirationDate?: Date;
    tourId?: number;
    authorId: number;
    formattedDate?: string;
    tourName?: string;
    isUsed?: boolean;
}