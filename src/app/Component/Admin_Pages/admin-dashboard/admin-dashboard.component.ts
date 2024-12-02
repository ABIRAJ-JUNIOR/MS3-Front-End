import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Service/API/Auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Admin } from '../../../Modals/modals';
import { AdminService } from '../../../Service/API/Admin/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  loginData!:any
  adminData!:Admin;

  constructor(
    private authService:AuthService,
    private adminService:AdminService
  ){
    const token = localStorage.getItem("token");
    if(token != null){
      const decode:any =jwtDecode(token)
      this.loginData = decode
      console.log(this.loginData)
    }
  }

  ngOnInit(): void {
    this.adminService.getadminbyID(this.loginData.Id).subscribe({
      next:(res:Admin)=>{
        this.adminData = res
      },complete:()=>{
        console.log(this.adminData)
      }
      ,error:(error:any)=>{
        console.log(error.error)
      }
    })
  }

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
