import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../../Modals/modals';
import { StudentDashDataServiceService } from '../../../Service/Student/student-dash-data-service.service';
import { StudentService } from '../../../Service/Student/student.service';

@Component({
  selector: 'app-student-mycourses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-mycourses.component.html',
  styleUrl: './student-mycourses.component.css'
})
export class StudentMycoursesComponent implements OnInit{


  constructor(private StudentDashDataService: StudentDashDataServiceService, private StudentApiService: StudentService, private router: Router) {
  }

  StudentDetails: any;
  StudentTokenDetails: any;
  NoImage: string = "https://cdn-icons-png.flaticon.com/512/9193/9193906.png"

  ngOnInit(): void {

    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.StudentDetails = student
      console.log(this.StudentDetails)
    }
      ,
      (error) => {
        this.router.navigate([''])
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
}