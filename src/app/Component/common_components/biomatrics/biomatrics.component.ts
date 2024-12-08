import { Component } from '@angular/core';
import { WindowAuthService } from '../../../Service/Biomatrics/window-auth.service';
import { CommonModule } from '@angular/common';
import { WindowDataService } from '../../../Service/Biomatrics/window-data.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-biomatrics',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './biomatrics.component.html',
  styleUrl: './biomatrics.component.css'
})
export class BiomatricsComponent {

  constructor(private windowDataService: WindowDataService) {

  }


  register() {
    const password = document.getElementById('password') as HTMLInputElement
    const email = document.getElementById('email') as HTMLInputElement
    this.windowDataService.register(email.value, password.value);


  }
}
