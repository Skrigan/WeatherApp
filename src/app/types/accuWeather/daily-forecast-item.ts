import { phraseToIcon } from '../../data/phraseToIcon';

export type DailyForecastItem = {
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
};
