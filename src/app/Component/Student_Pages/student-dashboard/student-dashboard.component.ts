import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet, RouterModule, Router } from "@angular/router";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { Student } from "../../../Modals/modals";
import { StudentService } from "../../../Service/API/Student/student.service";
import { NotificationServiceService } from "../../../Service/API/Notification/notification-service.service";
import { ToastrService } from "ngx-toastr";
import { CourseService } from "../../../Service/API/Course/course.service";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  sidebarCollapsed = false;
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  StudentDetails: any;
  StudentTokenDetails: any;




  constructor(private tostr:ToastrService,private NotificationSerivice:NotificationServiceService ,private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService, private router: Router ) {
  }

  ngOnInit(): void {

    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.StudentDetails = student
      console.log(this.StudentDetails)
      
    },
      (error) => {
        this.router.navigate([''])
      })


  }

  MarkAsRead(id:string){
    console.log(id)
    this.NotificationSerivice.MarkAsReadNotication(id).subscribe((data:any)=>{
     this.tostr.success("Notification Read SuccessFully")
    },(error)=>{
      console.log((error))
      this.tostr.error(error.message)
    })
  }


}
