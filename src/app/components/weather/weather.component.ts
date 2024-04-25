import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyForecastItem } from '../../types/accuWeather/daily-forecast';
import { HourlyForecastItem } from '../../types/openWeather/hourly-forecast';
import { LoaderComponent } from '../loader/loader.component';
import { WeatherHourlyComponent } from '../weather-hourly/weather-hourly.component';
import { WeatherDailyComponent } from '../weather-daily/weather-daily.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, LoaderComponent, WeatherHourlyComponent, WeatherDailyComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent {
  @Input({ required: true }) isDaily!: boolean;

  @Input({ required: true }) dailyForecast!: Array<DailyForecastItem & { icon: string }>;

  @Input({ required: true }) hourlyForecast!: Array<HourlyForecastItem & { icon: string }>;
}
