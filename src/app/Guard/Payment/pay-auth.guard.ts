import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Service/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';

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
    return false
    
  }

  
};