import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { WeatherHourlyComponent } from '../weather-hourly/weather-hourly.component';
import { WeatherDailyComponent } from '../weather-daily/weather-daily.component';
import { DailyForecastView } from '../../types/accuWeather/daily-forecast-view';
import { HourlyForecastView } from '../../types/openWeather/hourly-forecast-view';

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

  @Input({ required: true }) dailyForecast!: DailyForecastView;

  @Input({ required: true }) hourlyForecast!: HourlyForecastView;

  @Input({ required: true }) searchStatus: string | undefined;
}
