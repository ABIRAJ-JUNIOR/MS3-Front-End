import { Component } from '@angular/core';
import { WindowAuthService } from '../../../Service/Biomatrics/window-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-biomatrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './biomatrics.component.html',
  styleUrl: './biomatrics.component.css'
})
export class BiomatricsComponent {
  message: string | null = null; // Message to display feedback to the user
  isSuccess: boolean = false; // Indicates if the last action was successful

  constructor(private webAuthnService: WindowAuthService) { }

  // Trigger registration process and update the UI based on the outcome
  async register() {
    try {
      await this.webAuthnService.register();
      this.message = "Registration successful!"; // Success message if registration works
      this.isSuccess = true;
    } catch (err) {
      this.message = "Registration failed. Please try again."; // Error message if something goes wrong
      this.isSuccess = false;
    }
  }

  // Trigger authentication process and update the UI based on the outcome
  async login() {
    try {
      await this.webAuthnService.authenticate();
      this.message = "Authentication successful!"; // Success message if authentication works
      this.isSuccess = true;
    } catch (err) {
      this.message = "Authentication failed. Please try again."; // Error message if something goes wrong
      this.isSuccess = false;
    }
  }
}
