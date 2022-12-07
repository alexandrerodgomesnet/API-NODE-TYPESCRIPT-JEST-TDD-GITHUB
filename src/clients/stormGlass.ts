import { IForecastPoint, IStormGlassForecastResponse, IStormGlassPoint } from "@src/models";
import { ClienteRequestError, StormGlassResponseError } from "@src/util/errors";
import config, { IConfig } from 'config';
import { HttpClient } from '@src/util';

const resourceConfig: IConfig = config.get('App.resources.StormGlass');

export class StormGlass {
    readonly stormGlassAPIParams = 'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
    readonly stormGlassAPISource = 'noaa'
    constructor(protected request = new HttpClient()) { }

    public async fetchPoints(lat: number, lng: number): Promise<IForecastPoint[]> {

        try {
            const response = await this.request.get<IStormGlassForecastResponse>
                (`${resourceConfig.get('apiUrl')}/weather/point?lat=${lat}&lng=${lng}&params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}`,
                    {
                        headers: {
                            Authorization: resourceConfig.get('apiToken')
                        }
                    });
            return this.normalizeResponse(response.data);
        } catch (error: any) {

            if (HttpClient.isRequestError(error))
                throw new StormGlassResponseError(`Error: ${JSON.stringify(error.response.data)} Code: ${error.response.status}`)

            throw new ClienteRequestError(error.message);
        }
    }

    private normalizeResponse(points: IStormGlassForecastResponse): IForecastPoint[] {
        return points.hours.filter(this.isValidPoint.bind(this))
            .map((point) => ({
                time: point.time,
                swellDirection: point.swellDirection[this.stormGlassAPISource],
                swellHeight: point.swellHeight[this.stormGlassAPISource],
                swellPeriod: point.swellPeriod[this.stormGlassAPISource],
                windDirection: point.windDirection[this.stormGlassAPISource],
                windSpeed: point.windSpeed[this.stormGlassAPISource],
                waveDirection: point.waveDirection[this.stormGlassAPISource],
                waveHeight: point.waveHeight[this.stormGlassAPISource]
            }));
    }

    private isValidPoint(point: Partial<IStormGlassPoint>): boolean {
        return !!(
            point.time &&
            point.swellDirection?.[this.stormGlassAPISource] &&
            point.swellHeight?.[this.stormGlassAPISource] &&
            point.swellPeriod?.[this.stormGlassAPISource] &&
            point.windDirection?.[this.stormGlassAPISource] &&
            point.windSpeed?.[this.stormGlassAPISource] &&
            point.waveDirection?.[this.stormGlassAPISource] &&
            point.waveHeight?.[this.stormGlassAPISource]
        );
    }
}