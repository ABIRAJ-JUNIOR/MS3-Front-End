import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Service/API/Auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  constructor(private authService:AuthService){}

  logout(){
    this.authService.logout();
    this.refreshPage()
  }

  refreshPage(): void {
    window.location.reload();
  }
  sidebarCollapsed = false;
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
