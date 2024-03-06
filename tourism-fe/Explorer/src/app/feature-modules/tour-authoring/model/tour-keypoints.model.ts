export interface TourKeyPoints{
    id?: number,
    name: string,
    description: string,
    image: string,
    longitude: number,
    latitude: number,
    tourId: number,
    positionInTour: number,
    publicPointId?: number,
    secret?: string,
}

export interface TourKeyPointDto{
    longitude: number,
    latitude: number
}

export interface PublicTourKeyPoints {
    id?: number,
    name: string,
    description: string,
    image: string,
    latitude: number,
    longitude: number,
    status: string,
    creatorId: number
}