import { EBeachPosition } from "@src/enums";

export interface IBeach {
    lat: number;
    lng: number;
    name: string;
    position: EBeachPosition,
    user: string;
}