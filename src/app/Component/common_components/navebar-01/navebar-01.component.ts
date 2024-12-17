import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TopinfoComponent } from '../topinfo/topinfo.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Service/API/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { StudentDashDataService } from '../../../Service/Data/Student_Data/student-dash-data.service';
import { EnrollmentService } from '../../../Service/API/Enrollment/enrollment.service';

@Component({
  selector: 'app-navebar-01',
  standalone: true,
  imports: [RouterModule, TopinfoComponent, CommonModule],
  templateUrl: './navebar-01.component.html',
  styleUrl: './navebar-01.component.css',
})
export class Navebar01Component {
  isAdmin: boolean = false;
  isStudent: boolean = false;

  sidebarCollapsed = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly tostr: ToastrService,
    private readonly EnrollmentService:EnrollmentService,
    private readonly studentDataService:StudentDashDataService
  ) {
    if (authService.isLoggedInAdmin()) {
      this.isAdmin = true;
      this.isStudent = false;
    }

    if (authService.isLoggedInStudent()) {
      this.isAdmin = false;
      this.isStudent = true;
    }
  }
  
  StudentTokenDetails: any;
  enrollmentLength:number=0;
  ngOnInit() {
    this.StudentTokenDetails = this.studentDataService.GetStudentDeatilByLocalStorage()
   if (this.StudentTokenDetails) {
    this.EnrollmentService.getAllEnrollmentsByStudentId(this.StudentTokenDetails.Id).subscribe({
      next:(response:any)=>{
        this.enrollmentLength = response.length
        console.log(response)
      },error:(error)=>{
        console.log(error.error)
      }
    })
   }

  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout() {
    this.authService.logout();
  }

  goToDashboard() {
    if (this.isAdmin) {
      this.router.navigate(['/admin-dashboard']);
    }else if(this.isStudent){
      console.log(this.enrollmentLength)
      if (this.enrollmentLength > 0) {

      this.router.navigate(['/student-dashboard']);
      }else{
        this.tostr.error('You have not enrolled in any course yet') 
      }
    }
  }

  goToProfile() {
    if (this.isAdmin) {
      this.router.navigate(['/admin-dashboard/admin-profile']);
    }else if(this.isStudent){
      this.router.navigate(['/Way/profile']);
    }
  }

  SearchCourse() {
     let searchData=document.getElementById('searchData') as HTMLInputElement
     if (searchData.value) {
      this.router.navigate(['/search/'+searchData.value])
     }
  }
  
}
