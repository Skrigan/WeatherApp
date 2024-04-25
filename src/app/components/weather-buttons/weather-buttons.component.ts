import {
  ChangeDetectionStrategy, Component, EventEmitter, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-buttons.component.html',
  styleUrl: './weather-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherButtonsComponent {
  @Output() forecastSwitch = new EventEmitter<boolean>();

  isDaily = true;

  onForecastSwitch(isDaily: boolean): void {
    if (this.isDaily !== isDaily) {
      this.isDaily = isDaily;
      this.forecastSwitch.emit(isDaily);
    }
  }
}
