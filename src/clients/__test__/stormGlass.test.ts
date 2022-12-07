import { StormGlass } from '@src/clients/stormGlass';
import { HttpClient } from "@src/util";
import { IResponse } from "@src/models/response";
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';

jest.mock('@src/util');

describe('StormGlass Client', () => {
    
    const mockedRequestClass = HttpClient as jest.Mocked<typeof HttpClient>;
    const mockedRequest = new HttpClient() as jest.Mocked<HttpClient>;

    const lat = -33.792726;
    const lng = 151.289824;

    it('should return the normalized forecast from the StormGlass service', async () =>{        
        mockedRequest.get.mockResolvedValue({ 
            data: stormGlassWeather3HoursFixture 
        } as IResponse);

        const stormGlass = new StormGlass(mockedRequest);
        const response = await stormGlass.fetchPoints(lat, lng);
        expect(response).toEqual(stormGlassNormalized3HoursFixture);
    });

    it('should exclude incomplete data points', async () => {
        const incompleteResponse = {
            hours: [
                {
                    winDirection: {
                        noaa: 300
                    },
                    time: '2020-04-26T00:00:00+00:00'
                }
            ]                
        };

        mockedRequest.get.mockResolvedValue({ 
            data: incompleteResponse 
        } as IResponse );

        const stormGlass = new StormGlass(mockedRequest);
        const response = await stormGlass.fetchPoints(lat, lng);
        expect(response).toEqual([]);
    });

    it('should get a generic error from StormGlass service when the request fail before reaching the service', async () => {
        mockedRequest.get.mockRejectedValue({ message: 'Network Error' });

        const stormGlass = new StormGlass(mockedRequest);
        await expect(stormGlass.fetchPoints(lat, lng))
            .rejects
            .toThrow('Unexpected error when trying to communicate to StormGlass: Network Error');
    });

    it('should get an StormGlassResponseError when the StormGlass service responds with error', async () => {
        mockedRequestClass.isRequestError.mockReturnValue(true);
        mockedRequest.get.mockRejectedValue({
            response: {
                status: 429,
                data: { errors: ['Rate Limit reached'] }
            }
        });

        const stormGlass = new StormGlass(mockedRequest);
        await expect(stormGlass.fetchPoints(lat, lng))
            .rejects
            .toThrow('Unexpected error returned by the StormGlass service: Error: {"errors":["Rate Limit reached"]} Code: 429');            
    });
});