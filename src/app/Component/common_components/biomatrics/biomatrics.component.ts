import { Component } from '@angular/core';
import { WindowAuthService } from '../../../Service/Biomatrics/window-auth.service';
import { CommonModule } from '@angular/common';
import { WindowDataService } from '../../../Service/Biomatrics/window-data.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-biomatrics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './biomatrics.component.html',
  styleUrl: './biomatrics.component.css'
})
export class BiomatricsComponent {

  constructor(private windowDataService: WindowDataService, private router: Router) {

  }


  register() {
    const emailInput = document.getElementById('email') as HTMLInputElement
    const passwordInput = document.getElementById('password') as HTMLInputElement

    const email = emailInput?.value.trim();
    const password = passwordInput?.value.trim();
    if (!email || !password) {
      alert('Please provide both email and password.');
      return;
    }
    this.windowDataService.register(email,password);

  }
}
