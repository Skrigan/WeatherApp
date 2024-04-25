import { City } from './city';

export type CitySearchItem = City & {
  GeoPosition: {
    Latitude: number
    Longitude: number
  }
};
