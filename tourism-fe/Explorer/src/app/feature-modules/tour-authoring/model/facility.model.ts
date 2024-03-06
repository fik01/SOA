export interface Facility {
    id: number,
    name: string,
    description: string,
    image: string,
    category: FacilityCategory,
    latitude: number,
    longitude: number
}
export interface PublicFacility {
    id: number,
    name: string,
    description: string,
    image: string,
    category: FacilityCategory,
    latitude: number,
    longitude: number,
    status: string,
    creatorId: number
}

export enum FacilityCategory {
    Wc,
    Restaurant,
    Parking,
    Other
}

export interface FacilityPointDto {
    latitude: number,
    longitude: number
}