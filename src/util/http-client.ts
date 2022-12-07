import { IRequestConfig, IResponse } from "@src/models";
import axios, { AxiosError } from "axios";

export class HttpClient {
    constructor(private request = axios){}

    public get<T>(url: string, config: IRequestConfig = {}): Promise<IResponse<T>> {
        return this.request.get<T, IResponse<T>>(url, config);
    }

    public static isRequestError(error: AxiosError): boolean {
        return !!(error.response && error.response?.status);
    }
}