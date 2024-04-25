import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherItemComponent } from '../weather-item/weather-item.component';
import { DailyForecastView } from '../../types/accuWeather/daily-forecast-view';

@Component({
  selector: 'app-weather-daily',
  standalone: true,
  imports: [CommonModule, WeatherItemComponent],
  templateUrl: './weather-daily.component.html',
  styleUrl: './weather-daily.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDailyComponent {
  @Input({ required: true }) dailyForecast!: DailyForecastView;
}
