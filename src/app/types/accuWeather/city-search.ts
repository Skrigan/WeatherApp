import { City } from './city';

export type CitySearch = CitySearchItem[];

export type CitySearchItem = City & {
  GeoPosition: {
    Latitude: number
    Longitude: number
  }
};
