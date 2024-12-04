import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';
import { API_BASE_HREF, getApiBase, getBaseLocation } from './utils/base-url.service';
import { provideAuth } from './core/auth.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'CSRF-TOKEN',
        headerName: 'X_CSRF-TOKEN',
      })
    ),
    { provide: API_BASE_HREF, useFactory: getBaseLocation },
    { provide: API_BASE_HREF, useFactory: getApiBase },
    provideRouter(routes),
    provideAuth(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }), provideAnimationsAsync(),
  ],
};
