import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Service/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';

export const payAuthGuard: CanActivateFn = (route, state) => {
  const authService  = inject(AuthService)
  const router = inject(Router)

  if(authService.isLoggedInStudent()){
    if (authService.IsPaymentInStudent()) {
      return true
    }else{
      return false
    }
  }else{
    return false
    
  }

  
};
