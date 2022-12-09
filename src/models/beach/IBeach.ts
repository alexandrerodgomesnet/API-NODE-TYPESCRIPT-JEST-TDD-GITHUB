import { EBeachPosition } from "@src/enums";

export interface IBeach {
    _id?: string; 
    lat: number;
    lng: number;
    name: string;
    position: EBeachPosition
}