import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TopinfoComponent } from '../topinfo/topinfo.component';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Service/API/Auth/auth.service';

@Component({
  selector: 'app-navebar-01',
  standalone: true,
  imports: [RouterModule,TopinfoComponent,CommonModule],
  templateUrl: './navebar-01.component.html',
  styleUrl: './navebar-01.component.css'
})
export class Navebar01Component {
  isAdmin:boolean = false;
  isStudent:boolean = false;

  sidebarCollapsed = false;

  constructor(private authService:AuthService , private router:Router) {
    if(authService.isLoggedInAdmin()){
      this.isAdmin = true
      this.isStudent = false
    }

    if(authService.isLoggedInStudent()){
      this.isAdmin = false
      this.isStudent = true
    }
  }


  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout(){
    this.authService.logout();
    this.refreshPage()
  }

  refreshPage(): void {
    window.location.reload();
  }

  goToDashboard(){
    if(this.isAdmin){
      this.router.navigate(['/admin-dashboard']);
    }else if(this.isStudent){
      this.router.navigate(['/student-dashboard']);
    }
  }
}
