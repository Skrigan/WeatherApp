import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Autocomplete } from '../types/accuWeather/autocomplete';
import { DailyForecast } from '../types/accuWeather/daily-forecast';
import { CitySearch } from '../types/accuWeather/city-search';
import { HourlyForecast } from '../types/openWeather/hourly-forecast';
import { CacheService } from './cache/cache.service';
import { cachedRequest } from './cache/cache-decorator';
import { CurrentWeather } from '../types/openWeather/current-weather';
import { City } from '../types/accuWeather/city';

// for AccuWeather
const apikey = '4eLXHTUdWv7LWEpXMY5Tx4QCwa15qjAw';
// for OpenWeather
const appid = '87bea92a8ecb01b03d84f152dad4a0ad';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient, private cache: CacheService) { }

  @cachedRequest(function () { return this.cache; })
  getAutocomplete(text: string) {
    return this.http.get<Autocomplete>('https://dataservice.accuweather.com/locations/v1/cities/autocomplete', {
      params: {
        apikey,
        q: text,
      },
    });
  }

  @cachedRequest(function () { return this.cache; })
  getCitySearch(text: string) {
    return this.http.get<CitySearch>('https://dataservice.accuweather.com/locations/v1/cities/search', {
      params: {
        apikey,
        q: text,
      },
    });
  }

  @cachedRequest(function () { return this.cache; })
  getCity(latitude: number, longitude: number) {
    return this.http.get<City>('https://dataservice.accuweather.com/locations/v1/cities/geoposition/search', {
      params: {
        apikey,
        q: `${latitude}, ${longitude}`,
      },
    });
  }

  @cachedRequest(function () { return this.cache; })
  getCityByLocationKey(locationKey: string) {
    return this.http.get<CitySearch[number]>(`https://dataservice.accuweather.com/locations/v1/${locationKey}`, {
      params: {
        apikey,
      },
    });
  }

  @cachedRequest(function () { return this.cache; })
  getDailyForecast(locationKey: string) {
    return this.http.get<DailyForecast>(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`, {
      params: {
        apikey,
        metric: true,
      },
    });
  }

  @cachedRequest(function () { return this.cache; })
  getHourlyForecast(latitude: number, longitude: number) {
    return this.http.get<HourlyForecast>('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        lat: latitude,
        lon: longitude,
        appid,
        units: 'metric',
      },
    });
  }

  getCurrentWeather(latitude: number, longitude: number) {
    return this.http.get<CurrentWeather>('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: latitude,
        lon: longitude,
        appid,
        units: 'metric',
      },
    });
  }
}
