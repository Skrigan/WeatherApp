import { Weather } from './weather';

export type HourlyForecast = {
  list: HourlyForecastItem[]
};

export type HourlyForecastItem = {
  main: {
    temp: number
  }
  weather: Weather[]
  dt_txt: string
};
