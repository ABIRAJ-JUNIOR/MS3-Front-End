import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Student } from "../../../Modals/modals";
import { StudentService } from "../../../Service/API/Student/student.service";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { EnrollmentService } from "../../../Service/API/Enrollment/enrollment.service";

@Component({
  selector: 'app-student-completedcourses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-completedcourses.component.html',
  styleUrl: './student-completedcourses.component.css'
})
export class StudentCompletedcoursesComponent {
  StatusCheck: string = "Completed";
  constructor(private EnrollmentService: EnrollmentService, private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService, private router: Router) {
  }

  StudentDetails: any[] = [];

  StudentTokenDetails: any;
  NoImage: string = "https://cdn-icons-png.flaticon.com/512/9193/9193906.png"

  ngOnInit(): void {
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();
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
        for (let i: number = 0; i < this.Enrollments.length; i++) {
          console.log("work")
          const element = this.Enrollments[i];
          if (element.courseScheduleResponse.scheduleStatus == this.StatusCheck) {
            this.StudentDetails.push(element)
          }
        }

      }
    })
  }


  NoCourseBool: boolean = true;
  CompleteCourseCalculation(item: any): boolean {

    const currentDate = new Date();
    const endDate = new Date(item.courseScheduleResponse.endDate);
    if (currentDate > endDate) {
      this.NoCourseBool = true
      return true;
    } else {
      return false;
    }

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
}
