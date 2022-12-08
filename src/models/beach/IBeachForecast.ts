import { IBeach } from "./IBeach";
import { IForecastPoint } from "../forecast";

export interface IBeachForecast extends Omit<IBeach, 'user'>, IForecastPoint {}