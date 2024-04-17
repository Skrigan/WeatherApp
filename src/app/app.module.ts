import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { OAuthModule } from 'angular-oauth2-oidc';
import { ButtonComponent } from './components/button/button.component';
import { AppComponent } from './app.component';
import { DateComponent } from './components/date/date.component';
import { SliderComponent } from './components/slider/slider.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    DateComponent,
    SliderComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    OAuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
