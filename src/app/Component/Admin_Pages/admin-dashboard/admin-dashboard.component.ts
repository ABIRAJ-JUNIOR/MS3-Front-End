import { Component } from '@angular/core';
import { StudentRegistrationComponent } from '../../Student_Pages/student-registration/student-registration.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet,StudentRegistrationComponent,RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  logout(){

  }
}
