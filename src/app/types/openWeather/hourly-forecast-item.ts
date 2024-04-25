import { Weather } from './weather';

export type HourlyForecastItem = {
  main: {
    temp: number
  }
  weather: Weather[]
  dt_txt: string
};
