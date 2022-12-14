import { InternalError } from "@src/util/errors";

export class ClienteRequestError extends InternalError {
    constructor(message: string){
        const internalMessage = 'Unexpected error when trying to communicate to StormGlass';
        super(`${internalMessage}: ${message}`);
    }
}