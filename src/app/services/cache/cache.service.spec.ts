import { of } from 'rxjs';
import { WeatherService } from '../weather.service';
import { CacheService } from './cache.service';

describe('cacheService testing', () => {
  let service: WeatherService;
  let httpClientSpy: any;
  let cache: CacheService;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
    };
    cache = new CacheService();
    service = new WeatherService(httpClientSpy, cache);
  });
  it('should call http.get once', () => {
    const response = {};
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));

    service.getCityByLocationKey('28580');
    service.getCityByLocationKey('178087');
    service.getCityByLocationKey('28580');
    service.getCityByLocationKey('28580');
    service.getCityByLocationKey('178087');

    expect(httpClientSpy.get).toBeCalledTimes(2);
  });
});
