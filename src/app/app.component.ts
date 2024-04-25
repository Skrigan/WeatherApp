import {
  Component, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import {
  debounceTime, filter, fromEvent, map, tap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DailyForecastItem } from './types/accuWeather/daily-forecast';
import { GoogleApiService } from './services/google-api.service';
import { WeatherService } from './services/weather.service';
import { HourlyForecastItem } from './types/openWeather/hourly-forecast';
import { Autocomplete } from './types/accuWeather/autocomplete';
import { phraseToIcon } from './data/phraseToIcon';
import { LoaderComponent } from './components/loader/loader.component';
import { WeatherHourlyComponent } from './components/weather-hourly/weather-hourly.component';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import { WeatherDailyComponent } from './components/weather-daily/weather-daily.component';
import { WeatherComponent } from './components/weather/weather.component';
import { AuthComponent } from './components/auth/auth.component';
import {EventsComponent} from "./components/events/events.component";
import {SearchInputComponent} from "./components/search-input/search-input.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoaderComponent, WeatherHourlyComponent, FormsModule, WeatherItemComponent, WeatherDailyComponent, WeatherComponent, AuthComponent, EventsComponent, SearchInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;

  date = new Date();

  locationKey: string | undefined;

  latitude: number | undefined;

  longitude: number | undefined;

  dailyForecast: Array<DailyForecastItem & { icon: string }> = [];

  hourlyForecast: Array<HourlyForecastItem & { icon: string }> = [];

  isFocused = false;

  location = '';

  isDaily = true;

  constructor(private weatherService: WeatherService, public googleApi: GoogleApiService) {
  }

  ngOnInit() {
    setInterval(() => this.date = new Date(), 1000);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.latitude = latitude;
        this.longitude = longitude;
        this.weatherService.getCity(latitude, longitude)
          .subscribe((geoposition) => {
            this.location = `${geoposition.LocalizedName}, ${geoposition.Country.LocalizedName}`;
            this.locationKey = geoposition.Key;
            this.getForecast();
            this.changeBodyBackground();
          });
      });
    }
  }

  changeBodyBackground() {
    if (this.latitude && this.longitude) {
      this.weatherService.getCurrentWeather(this.latitude, this.longitude).subscribe((weather) => {
        const img = new Image();
        const { main } = weather.weather[0];
        const { description } = weather.weather[0];
        let path = '';

        if (main !== 'Clouds') path = main;
        else path = `${main}/${description}`;

        img.src = `./assets/backgrounds/${path}.jpg`;
        img.onload = () => {
          document.body.style.backgroundImage = `url(${img.src})`;
        };
      });
    }
  }

  onSearch(location: string) {
    this.searchReset();

    this.weatherService.getCitySearch(location).subscribe((cities) => {
      const city = cities[0];
      this.latitude = city.GeoPosition.Latitude;
      this.longitude = city.GeoPosition.Longitude;
      this.locationKey = city.Key;
      this.getForecast();
      this.changeBodyBackground();
    });
  }

  onElasticSearch(locationKey: string) {
    this.searchReset();

    this.weatherService.getCityByLocationKey(locationKey).subscribe((location) => {
      this.latitude = location.GeoPosition.Latitude;
      this.longitude = location.GeoPosition.Longitude;
      this.locationKey = locationKey;
      this.getForecast();
      this.changeBodyBackground();
    });
  }

  searchReset() {
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
          this.dailyForecast = forecast.DailyForecasts.map((item) => Object.assign(item, { icon: phraseToIcon[item.Day.IconPhrase] }));
        });
    } else if (this.latitude && this.longitude) {
      this.weatherService.getHourlyForecast(this.latitude, this.longitude)
        .subscribe((forecast) => {
          this.hourlyForecast = forecast.list.map((item) => {
            const { main } = item.weather[0];
            const { description } = item.weather[0];
            return Object.assign(item, { icon: main !== 'Clouds' ? main : `${main}/${description}` });
          });
        });
    }
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
