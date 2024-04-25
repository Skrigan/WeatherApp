import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {WeatherService} from "../../services/weather.service";
import {Autocomplete} from "../../types/accuWeather/autocomplete";
import {debounceTime, filter, fromEvent, map, tap} from "rxjs";

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent implements OnInit {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;

  @Input() set setValue(value: string) { this.location = value; }

  @Output() search = new EventEmitter<string>();

  @Output() elasticSearch = new EventEmitter<string>();

  location = '';

  autocomplete: Autocomplete = [];

  isFocused = false;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(
        tap(() => { this.autocomplete = []; }),
        debounceTime(500),
        map((ev: any) => (ev.target as HTMLInputElement).value),
        filter((str) => (str.length > 2)),
      ).subscribe((str) => {
        this.weatherService.getAutocomplete(str)
          .subscribe((autocomplete) => {
            this.autocomplete = autocomplete.slice(0, 5);
          });
      });
  }

  onSearch() {
    this.search.emit(this.location);
  }

  onElasticSearch(event: MouseEvent) {
    this.autocomplete = [];

    const target = event.target as HTMLLIElement;
    this.location = target.textContent!;
    this.elasticSearch.emit(target.getAttribute('data-locationKey')!);
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }
}
