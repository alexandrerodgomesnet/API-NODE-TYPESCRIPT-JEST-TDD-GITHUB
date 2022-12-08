import { IBeach } from "./IBeach";
import { IForecastPoint } from "@src/models/forecast";

export interface IBeachForecast extends Omit<IBeach, 'user'>, IForecastPoint {}