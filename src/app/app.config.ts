import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Chart.js 
import { Chart, registerables } from 'chart.js';
import { authInterceptorInterceptor } from './Interceptor/auth-interceptor.interceptor';
Chart.register(...registerables);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimations(), provideToastr(), provideHttpClient(withInterceptors([authInterceptorInterceptor]))]
};
