import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autocomplete } from '../types/accuWeather/autocomplete';
import { DailyForecast } from '../types/accuWeather/daily-forecast';
import { CitySearch } from '../types/accuWeather/city-search';
import { HourlyForecast } from '../types/openWeather/hourly-forecast';
import { CacheService } from './cache/cache.service';
import { cachedRequest } from './cache/cache-decorator';
import { CurrentWeather } from '../types/openWeather/current-weather';
import { City } from '../types/accuWeather/city';
import { environment } from '../../environments/environment';
import { CitySearchItem } from '../types/accuWeather/city-search-item';

const { apikey, appid } = environment;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private accuOrigin = 'https://dataservice.accuweather.com';

  private openOrigin = 'https://api.openweathermap.org';

  constructor(private http: HttpClient, private cache: CacheService) { }

  @cachedRequest(function () { return this.cache; })
  getAutocomplete(text: string): Observable<Autocomplete> {
    return this.http.get<Autocomplete>(`${this.accuOrigin}/locations/v1/cities/autocomplete`, {
      params: {
        apikey,
        q: text,
      },
    });
  }

  @cachedRequest(function () { return this.cache; })
  getCitySearch(text: string): Observable<CitySearch> {
    return this.http.get<CitySearch>(`${this.accuOrigin}/locations/v1/cities/search`, {
      params: {
        apikey,
        q: text,
      },
    });
  }

  @cachedRequest(function () { return this.cache; })
  getCity(latitude: number, longitude: number): Observable<City> {
    return this.http.get<City>(`${this.accuOrigin}/locations/v1/cities/geoposition/search`, {
      params: {
        apikey,
        q: `${latitude}, ${longitude}`,
      },
    });
  }

  @cachedRequest(function () { return this.cache; })
  getCityByLocationKey(locationKey: string): Observable<CitySearchItem> {
    return this.http.get<CitySearch[number]>(`${this.accuOrigin}/locations/v1/${locationKey}`, {
      params: {
        apikey,
      },
    });
  }

  @cachedRequest(function () { return this.cache; })
  getDailyForecast(locationKey: string): Observable<DailyForecast> {
    return this.http.get<DailyForecast>(`${this.accuOrigin}/forecasts/v1/daily/5day/${locationKey}`, {
      params: {
        apikey,
        metric: true,
      },
    });
  }

  @cachedRequest(function () { return this.cache; })
  getHourlyForecast(latitude: number, longitude: number): Observable<HourlyForecast> {
    return this.http.get<HourlyForecast>(`${this.openOrigin}/data/2.5/forecast`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid,
        units: 'metric',
      },
    });
  }

  getCurrentWeather(latitude: number, longitude: number): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(`${this.openOrigin}/data/2.5/weather`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid,
        units: 'metric',
      },
    });
  }
}
