import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet, RouterModule } from "@angular/router";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";

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

  constructor(private StudentDashDataService:StudentDashDataService){

  }

  StudentDetails:any;


  ngOnInit(): void {
    this.StudentDetails=this.StudentDashDataService.GetStudentDeatilByLocalStorage();
  }

   

}
