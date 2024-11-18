import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptorService } from './app/Service/Interceptor/auth-interceptor.service';

bootstrapApplication(AppComponent,{
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
}).catch((err) => console.error(err));
