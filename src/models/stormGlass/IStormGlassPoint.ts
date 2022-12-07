import { IStormGlassPointSource } from "./IStormGlassPointSource";

export interface IStormGlassPoint {
    readonly time: string;
    readonly swellDirection: IStormGlassPointSource;
    readonly swellHeight: IStormGlassPointSource;
    readonly swellPeriod: IStormGlassPointSource;
    readonly waveHeight: IStormGlassPointSource;
    readonly waveDirection: IStormGlassPointSource;
    readonly windDirection: IStormGlassPointSource;
    readonly windSpeed: IStormGlassPointSource;
}