import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogoutServiceService {

  
  constructor(private router:Router) { }


  LogoutStudent(){
    localStorage.removeItem('token');
    this.router.navigate(['']);

  }

}
