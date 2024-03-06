import { Tour } from "./tour.model";

export interface Bundle {
    id? : number;
    name: string;
    price: number;
    authorId: number;
    toursId: number[];
    bundleState: number;
}