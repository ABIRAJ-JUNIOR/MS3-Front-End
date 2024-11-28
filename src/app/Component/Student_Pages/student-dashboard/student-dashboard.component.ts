import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StudentDashDataServiceService } from '../../../Service/Student/student-dash-data-service.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  sidebarCollapsed = false;
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  constructor(private StudentDashDataService:StudentDashDataServiceService){

  }

  StudentDetails:any;


  ngOnInit(): void {
    this.StudentDetails=this.StudentDashDataService.GetStudentDeatilByLocalStorage();
  }

   

}
