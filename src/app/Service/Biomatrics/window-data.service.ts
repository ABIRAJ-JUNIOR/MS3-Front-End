import { Injectable } from '@angular/core';
import { WindowAuthService } from './window-auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WindowDataService {

  message: string | null = null; 
  isSuccess: boolean = false; 

  constructor(private webAuthnService: WindowAuthService ,private tostre:ToastrService) { }

  async register() {
    try {
      await this.webAuthnService.register();
     return true
    } catch (err) {
      return false
    }
  }

  async login() {
    try {
      await this.webAuthnService.authenticate();
      this.message = "Authentication successful!"; 
      return true;
    } catch (err) {
      this.message = "Authentication failed. Please try again."; 
      return false;
    }
  }
}
