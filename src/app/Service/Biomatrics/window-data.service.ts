import { Injectable } from '@angular/core';
import { WindowAuthService } from './window-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WindowDataService {

  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private webAuthnService: WindowAuthService, private tostre: ToastrService ,private route:Router) { }

  async register(email:any,password:any) {
    try {
      await this.webAuthnService.register(email,password);
      this.route.navigate(['/signin'])
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
