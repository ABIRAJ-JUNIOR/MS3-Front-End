import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Service/Auth/auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authService  = inject(AuthService)
  const router = inject(Router)
  if(authService.isLoggedInAdmin()){
    return true
  }else{
    return false
  }
};