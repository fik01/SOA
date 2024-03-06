import { Tour } from "./tour.model";

export interface Campaign {
    tours: Tour[],
    name: string,
    description: string,
    touristId: number,
}