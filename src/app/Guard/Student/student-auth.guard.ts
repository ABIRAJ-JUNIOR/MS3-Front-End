import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Service/API/Auth/auth.service';

export const studentAuthGuard: CanActivateFn = (route, state) => {
  const authService  = inject(AuthService)
  const router = inject(Router)
  if(authService.isLoggedInStudent()){
    return true
  }else{
    router.navigate(['/Way/home'])
    return false
  }
};
