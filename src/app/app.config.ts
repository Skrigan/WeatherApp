import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  OAuthStorage,
  provideOAuthClient,
} from 'angular-oauth2-oidc';

function oAuthStorageFactory(): OAuthStorage { return localStorage; }

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideOAuthClient(),
    { provide: OAuthStorage, useFactory: oAuthStorageFactory },
  ],
};
