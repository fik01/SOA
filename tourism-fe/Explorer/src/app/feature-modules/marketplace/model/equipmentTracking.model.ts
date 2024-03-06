import { Equipment } from "./equipment.model";

export interface EquipmentTracking {
    id?: number,
    touristId? : number,
    neededEquipment : Array<number>
}