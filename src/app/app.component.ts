import {
  Component, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import {
  debounceTime, filter, fromEvent, map, tap,
} from 'rxjs';
import { DailyForecast } from './types/DailyForecast';
import { GoogleApiService } from './services/google-api.service';
import { WeatherService } from './services/weather.service';
import { HourlyForecast } from './types/HourlyForecast';
import { Autocomplete } from './types/Autocomplete';
import { openWeatherCodeToIcon } from './utils/openWeatherCodeToIcon';
import { accuWeatherPhraseToIcon } from './utils/accuWeatherPhraseToIcon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;

  location = '';

  locationKey: string | undefined;

  latitude: number | undefined;

  longitude: number | undefined;

  indexes: number[] = [8, 16, 24, 32, 40];

  dailyForecast: Array<DailyForecast['DailyForecasts'][number] & { icon: number }> = [];

  hourlyForecast: Array<HourlyForecast['list'][number] & { icon: number }> = [];

  autocomplete: Autocomplete = [];

  isFocused = false;

  isDaily = true;

  constructor(public googleApi: GoogleApiService, private weatherService: WeatherService) {
  }

  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.latitude = latitude;
        this.longitude = longitude;
        this.weatherService.getGeoposition(latitude, longitude)
          .subscribe((geoposition) => {
            this.location = `${geoposition.EnglishName}, ${geoposition.Country.EnglishName}`;
            this.locationKey = geoposition.Key;
            this.getForecast();
            this.changeBodyBackground();
          });
      });
    }

    fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(
        tap(() => { this.autocomplete = []; }),
        debounceTime(500),
        map((ev: any) => (ev.target as HTMLInputElement).value),
        filter((str) => (str.length > 2)),
      ).subscribe((str) => {
        this.weatherService.getAutocompleteSearch(str)
          .subscribe((autocomplete) => {
            this.autocomplete = autocomplete.slice(0, 5);
          });
      });
  }

  changeBodyBackground() {
    if (this.latitude && this.longitude) {
      this.weatherService.getCurrentWeather(this.latitude, this.longitude).subscribe((weather) => {
        const className = `body_${openWeatherCodeToIcon(weather.weather[0].id)}`;
        const { body } = document;
        if (!body.classList.contains(className)) {
          while (body.classList.length > 0) {
            body.classList.remove(body.classList[0]);
          }
          body.classList.add(className);
        }
      });
    }
  }

  onSearch() {
    this.searchReset();

    this.weatherService.getCitySearch(this.location).subscribe((cities) => {
      const city = cities[0];
      this.latitude = city.GeoPosition.Latitude;
      this.longitude = city.GeoPosition.Longitude;
      this.location = `${city.LocalizedName}, ${city.Country.LocalizedName}`;
      this.locationKey = city.Key;
      this.getForecast();
      this.changeBodyBackground();
    });
  }

  onElasticSearch(event: MouseEvent) {
    this.searchReset();

    const target = event.target as HTMLLIElement;
    this.location = target.textContent!;
    this.locationKey = target.getAttribute('data-locationKey')!;
    this.weatherService.getSearchByLocationKey(this.locationKey).subscribe((location) => {
      this.latitude = location.GeoPosition.Latitude;
      this.longitude = location.GeoPosition.Longitude;
      this.getForecast();
      this.changeBodyBackground();
    });
  }

  searchReset() {
    this.autocomplete = [];
    this.dailyForecast = [];
    this.hourlyForecast = [];

    this.locationKey = undefined;
    this.latitude = undefined;
    this.longitude = undefined;
  }

  getForecast() {
    if (this.isDaily && this.locationKey) {
      this.weatherService.getDailyForecast(this.locationKey)
        .subscribe((forecast) => {
          this.dailyForecast = forecast.DailyForecasts.map((item) => Object.assign(item, { icon: accuWeatherPhraseToIcon(item.Day.IconPhrase) }));
        });
    } else if (this.latitude && this.longitude) {
      this.weatherService.getHourlyForecast(this.latitude, this.longitude)
        .subscribe((forecast) => {
          this.hourlyForecast = forecast.list.map((item) => Object.assign(item, { icon: openWeatherCodeToIcon(item.weather[0].id) }));
        });
    }
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  onSignIn() {
    this.googleApi.signIn();
  }

  onSignOut() {
    this.googleApi.signOut();
  }

  onDaily() {
    if (!this.isDaily) {
      this.isDaily = true;
      if (this.dailyForecast.length === 0) {
        this.getForecast();
      }
    }
  }

  onHourly() {
    if (this.isDaily) {
      this.isDaily = false;
      if (this.hourlyForecast.length === 0) {
        this.getForecast();
      }
    }
  }
}
