import {
  ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild,
} from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { HourlyForecastItem } from '../../types/openWeather/hourly-forecast';
import { WeatherItemComponent } from '../weather-item/weather-item.component';

@Component({
  selector: 'app-slider',
  standalone: true,
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    DecimalPipe,
    WeatherItemComponent,
  ],
})
export class SliderComponent {
  @ViewChild('slides', { static: true }) slides!: ElementRef;

  @Input({ required: true }) hourlyForecast!: Array<HourlyForecastItem & { icon: string }>;

  currentSlide = 0;

  maxSlide = 4;

  indexes: number[] = [8, 16, 24, 32, 40];

  startX = 0;

  startY = 0;

  isScrolled: boolean | null = null;

  onTouchStart(event: TouchEvent) {
    this.startX = event.changedTouches[0].clientX;
    this.startY = event.changedTouches[0].clientY;
  }

  onTouchMove(event: TouchEvent) {
    if (this.isScrolled === null) {
      const deltaX = Math.abs(event.changedTouches[0].clientX - this.startX);
      const deltaY = Math.abs(event.changedTouches[0].clientY - this.startY);
      this.isScrolled = deltaY >= deltaX / 2;
    }

    if (!this.isScrolled) {
      event.preventDefault();
    }
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.isScrolled) {
      const endX = event.changedTouches[0].clientX;

      if (this.startX < endX && this.currentSlide > 0) {
        this.moveLeft();
      }

      if (this.startX > endX && this.currentSlide < this.maxSlide) {
        this.moveRight();
      }
    }

    this.isScrolled = null;
    this.startX = 0;
    this.startY = 0;
  }

  moveLeft() {
    if (this.currentSlide !== 0) {
      this.currentSlide -= 1;
      this.slides.nativeElement.style.transform = `translateX(calc(-100% * ${this.currentSlide}))`;
    }
  }

  moveRight() {
    if (this.currentSlide !== this.maxSlide) this.currentSlide += 1;
    this.slides.nativeElement.style.transform = `translateX(calc(-100% * ${this.currentSlide}))`;
  }
}
