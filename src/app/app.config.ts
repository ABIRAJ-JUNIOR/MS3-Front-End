import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorInterceptor } from './Interceptor/auth-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimations(), 
    provideToastr({
      positionClass: 'toast-top-right', 
      preventDuplicates: true,         
      timeOut: 2600,
    }), 
    provideHttpClient(withInterceptors([authInterceptorInterceptor])),
    importProvidersFrom([BrowserAnimationsModule]),
  ]
};
