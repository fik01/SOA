export interface TourDuration {
    timeInSeconds: number;
    transportation: TransportationType;
}

export enum TransportationType
{
    Walking,
    Bicycle,
    Car
}