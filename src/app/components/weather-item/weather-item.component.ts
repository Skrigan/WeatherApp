import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-item.component.html',
  styleUrl: './weather-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherItemComponent {
  @Input() type: 'daily' | 'dailyFirst' | 'hourly' = 'daily';

  @Input({ required: true }) date!: string | Date;

  @Input({ required: true }) icon!: string;

  @Input({ required: true }) temp!: number;
}
