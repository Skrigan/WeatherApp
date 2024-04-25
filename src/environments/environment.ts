export const environment = {
  // for AccuWeather
  apikey: 'uuTLw9nLu55OqCsABmvfBeASefuOfTxs',
  // for OpenWeather
  appid: '87bea92a8ecb01b03d84f152dad4a0ad',
  oAuthConfig: {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: window.location.origin,
    clientId: '1024400438746-sng2oomsojnkg854lah02onrrjn6muqe.apps.googleusercontent.com',
    scope: 'openid profile email https://www.googleapis.com/auth/calendar.readonly',
    showDebugInformation: true,
    silentRefreshRedirectUri: window.location.origin,
    useSilentRefresh: true,
  },
};
