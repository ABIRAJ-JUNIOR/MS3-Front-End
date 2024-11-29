import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Service/API/Auth/auth.service';

export const payAuthGuard: CanActivateFn = (route, state) => {
  const authService  = inject(AuthService)
  const router = inject(Router)
  const tostr = inject(ToastrService)

  if(authService.isLoggedInStudent()){
    if (authService.IsPaymentInStudent()) {
      return true
    }else{
      tostr.error("Please select a course and schedule before proceeding to payment.")
      return false
    }
  }else{
    tostr.error("Please Login and Purchase a course and schedule before proceeding to payment.")
    return false
  }

  
};
