import { Injectable } from '@angular/core';
import { WindowAuthService } from './window-auth.service';

@Injectable({
  providedIn: 'root'
})
export class WindowDataService {

  message: string | null = null; 
  isSuccess: boolean = false; 

  constructor(private webAuthnService: WindowAuthService) { }

  async register() {
    try {
      await this.webAuthnService.register();
      this.message = "Registration successful!"; 
      this.isSuccess = true;
    } catch (err) {
      this.message = "Registration failed. Please try again."; 
      this.isSuccess = false;
    }
  }

  async login() {
    try {
      await this.webAuthnService.authenticate();
      this.message = "Authentication successful!"; 
      this.isSuccess = true;
    } catch (err) {
      this.message = "Authentication failed. Please try again."; 
      this.isSuccess = false;
    }
  }
}
