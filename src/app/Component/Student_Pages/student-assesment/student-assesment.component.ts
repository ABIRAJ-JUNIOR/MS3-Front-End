import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { StudentService } from "../../../Service/API/Student/student.service";
import { FormsModule } from "@angular/forms";
import { EnrollmentService } from "../../../Service/API/Enrollment/enrollment.service";

@Component({
  selector: 'app-student-assesment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-assesment.component.html',
  styleUrl: './student-assesment.component.css'
})
export class StudentAssesmentComponent implements OnInit {

  TableView: number = 2;



  constructor(private StudentService: StudentService,
    private studentDataService: StudentDashDataService,
    private EnrollmentService:EnrollmentService
  ) {

  }
  paginateBeforeData: any[] = []; // Your full array of data
  currentPage: number = 1; // Current page number
  pageSize: number = 5; // Number of items per page
  totalPages: number = 0;
  paginatedAssesment: any[] = [];

  StatusCheck: string = "Completed"
  NotStartCheck: string = "NotStarted"

  StudentTokenDetails: any;
  ngOnInit() {
    this.StudentTokenDetails = this.studentDataService.GetStudentDeatilByLocalStorage()

    this.paginateAssesment()
    this.enrollmentServiceLoad()
  }

  Enrollments: any;


  enrollmentServiceLoad() {
    console.log("Your Enrollments id" + this.StudentTokenDetails.Id)

    this.EnrollmentService.getAllEnrollmentsByStudentId(this.StudentTokenDetails.Id).subscribe({
      next: (response) => {
        this.Enrollments =  response
        console.log(this.Enrollments[0])
      }, error: () => {

      }, complete: () => {
      }
    })
  }

  paginateAssesment() {

  
  }



  assesmentLink: string = "";

  examdataTransfer(assessmentLink: string) {
    this.assesmentLink = assessmentLink
  }
  GoExam() {
    alert(this.assesmentLink)
    if (this.assesmentLink) {
      window.open(this.assesmentLink, '_blank');
    }
  }


}
