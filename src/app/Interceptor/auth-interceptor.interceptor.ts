import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, finalize, throwError } from 'rxjs';
import { BusyService } from '../Service/Spinner/busy.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const busyService = inject(BusyService)
  busyService.busy()

  const rout = inject(Router);
  const token = localStorage.getItem('token')
  const clonedReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })
  
  return next(clonedReq).pipe(
    catchError(err => {
      if ([401, 403].includes(err.status)) {
        rout.navigate(['/Way/home']);
      }
      return throwError(() => err);
    }),
    delay(100),
    finalize(() => busyService.idle())
  );
  
  
};
