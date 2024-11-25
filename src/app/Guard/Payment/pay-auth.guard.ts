import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Service/Auth/auth.service';

export const payAuthGuard: CanActivateFn = (route, state) => {
  const authService  = inject(AuthService)
  const router = inject(Router)
  if(authService.isLoggedInStudent()){
    return true
  }else{
    router.navigate(['/signin'])
    return false
    
  }

  
};
