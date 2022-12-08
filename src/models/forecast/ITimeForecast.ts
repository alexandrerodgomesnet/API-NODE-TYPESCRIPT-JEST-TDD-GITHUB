import { IBeachForecast } from "@src/models/beach";

export interface ITimeForecast {
    time: string;
    forecast: IBeachForecast[]
}