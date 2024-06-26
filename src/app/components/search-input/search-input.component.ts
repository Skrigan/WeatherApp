import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  debounceTime, filter, fromEvent, map, Subscription, tap,
} from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { Autocomplete } from '../../types/accuWeather/autocomplete';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;

  @Input() set setValue(value: string) { this.location = value; }

  @Output() search = new EventEmitter<string>();

  @Output() elasticSearch = new EventEmitter<string>();

  location = '';

  autocomplete: Autocomplete = [];

  isFocused = false;

  keyupEvent!: Subscription;

  constructor(private weatherService: WeatherService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.keyupEvent = fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(
        tap(() => { this.autocomplete = []; }),
        debounceTime(500),
        map((ev: any) => (ev.target as HTMLInputElement).value),
        filter((str) => (str.length > 2)),
      ).subscribe((str) => {
        this.weatherService.getAutocomplete(str)
          .subscribe((autocomplete) => {
            this.autocomplete = autocomplete.slice(0, 5);
            this.cdr.detectChanges();
          });
      });
  }

  ngOnDestroy(): void {
    this.keyupEvent.unsubscribe();
  }

  onSearch(): void {
    this.inputElement.nativeElement.blur();
    this.search.emit(this.location);
  }

  onElasticSearch(event: MouseEvent): void {
    this.autocomplete = [];

    const target = event.target as HTMLLIElement;
    this.location = target.textContent!;
    this.elasticSearch.emit(target.getAttribute('data-locationKey')!);
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}
