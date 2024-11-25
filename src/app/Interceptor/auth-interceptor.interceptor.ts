import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  
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
        rout.navigate(['home']);
      }
      return throwError(() => err);
    })
  );
  
};
