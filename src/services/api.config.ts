import * as qs from "qs";
import { PathLike } from "fs";

export const apiConfig = {
    //returnRejectedPromiseOnError: true,
    withCredentials: true,
    timeout: 30000,
    // baseURL: "https://jsonplaceholder.typicode.com/",
    baseURL: "http://localhost:3001/",
    headers: {
        common: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${JSON.stringify('') || ''}`
        },
    },
    //paramsSerializer: (params: PathLike) => qs.stringify(params, { indices: false }),
}