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
  it('should call once', () => {
    const response = {};
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));

    service.getSearchByLocationKey('28580');
    service.getSearchByLocationKey('178087');
    service.getSearchByLocationKey('28580');
    service.getSearchByLocationKey('28580');
    service.getSearchByLocationKey('178087');

    expect(httpClientSpy.get).toBeCalledTimes(2);
  });
});
