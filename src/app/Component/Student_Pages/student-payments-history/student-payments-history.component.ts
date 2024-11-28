import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../../Modals/modals';
import { StudentDashDataServiceService } from '../../../Service/Student/student-dash-data-service.service';
import { StudentService } from '../../../Service/Student/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-payments-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-payments-history.component.html',
  styleUrl: './student-payments-history.component.css'
})
export class StudentPaymentsHistoryComponent {
  constructor(private StudentDashDataService: StudentDashDataServiceService, private StudentApiService: StudentService, private router: Router) {
  }

  Enrollments: any;
  StudentTokenDetails: any;
  NoImage: string = "https://cdn-icons-png.flaticon.com/512/9193/9193906.png"

  ngOnInit(): void {

    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.Enrollments = student.enrollments
      console.log(this.Enrollments)
    }
      ,
      (error) => {
        this.router.navigate([''])
      })

  }
}
