import { DailyForecastItem } from './daily-forecast-item';

export type DailyForecastView = Array<DailyForecastItem & { icon: string }>;
