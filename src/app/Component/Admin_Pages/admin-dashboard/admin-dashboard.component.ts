import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Service/API/Auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Admin, Announcement } from '../../../Modals/modals';
import { AdminService } from '../../../Service/API/Admin/admin.service';
import { AnnouncementService } from '../../../Service/API/Announcement/announcement.service';
import { HasRoleDirective } from '../../../Directives/has-role.directive';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,RouterLink,RouterLinkActive,HasRoleDirective],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  announcements:Announcement[] = [];
  totalAnnouncements:number = 0
  
  loginData!:any
  adminData!:Admin;
  constructor(
    private authService:AuthService,
    private adminService:AdminService,
    private announcement:AnnouncementService
  ){
    const token = localStorage.getItem("token");
    if(token != null){
      const decode:any =jwtDecode(token)
      this.loginData = decode
    }
  }

  ngOnInit(): void {
    this.loadAdminData();
    this.loadRecentAnnouncement();
    this.TotalNumberOfAnnouncement();
  }

  private loadAdminData():void{
    this.adminService.getadminbyID(this.loginData.Id).subscribe({
      next:(res:Admin)=>{
        this.adminData = res
      },error:(error:any)=>{
        console.log(error.error)
      }
    })
  }

  private TotalNumberOfAnnouncement():void{
    this.announcement.GetAllAnouncement().subscribe({
      next:(res:Announcement[])=>{
        res.forEach(a => {
          if(a.audienceType != "Student"){
            this.totalAnnouncements ++
          }
        })
      }
    })
  }

  private loadRecentAnnouncement():void{
    this.announcement.GetRecentAnnouncements(1).subscribe({
      next:(res:Announcement[])=>{
        this.announcements = res
      }
    })
  }

  logout(){
    this.authService.logout();
  }

  sidebarCollapsed = false;
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
