import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Student } from "../../../Modals/modals";
import { StudentService } from "../../../Service/API/Student/student.service";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { EnrollmentService } from "../../../Service/API/Enrollment/enrollment.service";

@Component({
  selector: 'app-student-payments-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-payments-history.component.html',
  styleUrl: './student-payments-history.component.css'
})
export class StudentPaymentsHistoryComponent {
  constructor(private EnrollmentService : EnrollmentService, private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService, private router: Router) {
  }

  Enrollments: any;
  StudentTokenDetails: any;
  NoImage: string = "https://cdn-icons-png.flaticon.com/512/9193/9193906.png"

  payCheck: string = "Paid"


  ngOnInit(): void {
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();
    this.enrollmentServiceLoad()



  }


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


}
