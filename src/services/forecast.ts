import { StormGlass } from "@src/clients/stormGlass";
import { IBeach, IBeachForecast, ITimeForecast } from "@src/models";

export class Forecast {
    constructor(protected stormGlass = new StormGlass()){}

    public async processForecastForBeaches(beaches: IBeach[]): Promise<ITimeForecast[]> {
        const pointsWithCorrectSources: IBeachForecast[] = [];
        for(const beach of beaches){
            const points = await this.stormGlass.fetchPoints(beach.lat, beach.lng);
            const enrichedBeachData = points.map((e) => ({
                ...{
                    lat: beach.lat,
                    lng: beach.lng,
                    name: beach.name,
                    position: beach.position,
                    rating: 1
                },
                ...e
            }));
            pointsWithCorrectSources.push(...enrichedBeachData);
        }

        return this.mapForecastForTime(pointsWithCorrectSources);
    }

    private mapForecastForTime(forecast: IBeachForecast[]): ITimeForecast[] {
        const forecastByTime: ITimeForecast[] = [];
        for(const point of forecast) {
            const timePoint = forecastByTime.find((f) => f.time === point.time);
            if(timePoint)
                timePoint.forecast.push(point);
            else
                forecastByTime.push({
                    time: point.time,
                    forecast: [point]
                })
        }

        return forecastByTime;
    }
}