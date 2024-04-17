import { phraseToIcon } from '../data/phraseToIcon';

export type DailyForecast = {
  DailyForecasts: {
    Date: string,
    Temperature: {
      Minimum: {
        Value: number
      },
      Maximum: {
        Value: number
      }
    }
    Day: {
      IconPhrase: keyof typeof phraseToIcon
    }
    Link: string
  }[]
};
