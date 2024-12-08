import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Student } from "../../../Modals/modals";
import { SearchMycoursePipe } from "../../../Pipes/search-mycourse.pipe";
import { StudentService } from "../../../Service/API/Student/student.service";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { EnrollmentService } from "../../../Service/API/Enrollment/enrollment.service";


@Component({
  selector: 'app-student-mycourses',
  standalone: true,
  imports: [CommonModule , FormsModule , SearchMycoursePipe],
  templateUrl: './student-mycourses.component.html',
  styleUrl: './student-mycourses.component.css'
})
export class StudentMycoursesComponent implements OnInit{


  constructor(private EnrollmentService:EnrollmentService, private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService, private router: Router) {
  }

  StudentDetails: any;
  StudentTokenDetails: any;
  NoImage: string = "https://cdn-icons-png.flaticon.com/512/9193/9193906.png"

  ngOnInit(): void {
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

   this.getStudentDetails();
   this.enrollmentServiceLoad();
  }
  Enrollments: any;


  enrollmentServiceLoad() {
    console.log("Your Enrollments id" + this.StudentTokenDetails.Id)

    this.EnrollmentService.getAllEnrollmentsByStudentId(this.StudentTokenDetails.Id).subscribe({
      next: (response) => {
        this.Enrollments = response
        console.log(this.Enrollments[0])
      }, error: () => {

      }, complete: () => {
      }
    })
  }

  
  getStudentDetails(){
    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe({
      next: (student: Student) => {
        this.StudentDetails = student
      },error:(error)=>{
        console.log(error)
      }
    })
  }

  getProgress(item: any): number {
    const startDate = new Date(item.courseScheduleResponse.startDate);
    const endDate = new Date(item.courseScheduleResponse.endDate);
    const currentDate = new Date();

    if (currentDate < startDate) {
      return 0;  // Progress is 0 if the course hasn't started
    } else if (currentDate > endDate) {
      return 100;  // Progress is 100 if the course has ended
    } else {
      // Calculate progress based on the current date
      const totalDuration = endDate.getTime() - startDate.getTime();
      const elapsedTime = currentDate.getTime() - startDate.getTime();
      return (elapsedTime / totalDuration) * 100;
    }
  }

  getProgressBarClass(item: any): string {
    const progress = this.getProgress(item);

    if (progress <= 30) {
      return 'low-progress';   // Low progress (Red)
    } else if (progress <= 70) {
      return 'medium-progress'; // Medium progress (Yellow)
    } else {
      return 'high-progress';   // High progress (Green)
    }
  }


  // Search Section

  SearchCourseData:string=""

  
}
