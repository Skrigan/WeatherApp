import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Events } from '../types/Events';

const oAuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '1024400438746-sng2oomsojnkg854lah02onrrjn6muqe.apps.googleusercontent.com',
  scope: 'openid profile email https://www.googleapis.com/auth/calendar.readonly',
  // showDebugInformation: true,
  silentRefreshRedirectUri: window.location.origin,
  useSilentRefresh: true,
};

interface UserInfo {
  info: {
    email: string
    name: string
  }
}

@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  userProfile$ = new BehaviorSubject<UserInfo | null | undefined>(undefined);

  calendarEvents$ = new BehaviorSubject<Events['items'] | null>(null);

  constructor(private oAuthService: OAuthService, private http: HttpClient) {
    oAuthService.configure(oAuthConfig);

    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if (oAuthService.hasValidAccessToken()) {
          oAuthService.loadUserProfile().then((userProfile) => {
            this.userProfile$.next(userProfile as UserInfo);
            this.http.get<Events>('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
              headers: { Authorization: `Bearer ${this.oAuthService.getAccessToken()}` },
            }).subscribe((events) => {
              const nowDate = new Date();
              const filteredArr = events.items.filter((event) => {
                const eventDate = new Date(event.start.dateTime);
                return nowDate.getFullYear() === eventDate.getFullYear()
                  && nowDate.getMonth() === eventDate.getMonth()
                  && nowDate.getDate() === eventDate.getDate();
              });
              filteredArr.forEach((event) => {
                const eventStartDate = new Date(event.start.dateTime);
                let hours: number | string = eventStartDate.getUTCHours();
                let minutes: number | string = eventStartDate.getMinutes();
                if (hours < 10) hours = `0${hours}`;
                if (minutes < 10) minutes = `0${minutes}`;
                event.start.dateTime = `${hours}:${minutes}`;
              });
              this.calendarEvents$.next(filteredArr);
            });
          });
        } else {
          this.userProfile$.next(null);
        }
      });
    });
  }

  signIn() {
    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        this.oAuthService.initLoginFlow();
      });
    });
  }

  signOut() {
    this.oAuthService.revokeTokenAndLogout();
    this.userProfile$.next(null);
    this.calendarEvents$.next(null);
  }
}
