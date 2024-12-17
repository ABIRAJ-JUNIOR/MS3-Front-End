import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { StudentService } from "../../../Service/API/Student/student.service";
import { FormsModule } from "@angular/forms";
import { EnrollmentService } from "../../../Service/API/Enrollment/enrollment.service";
import { StudentAssessmentService } from "../../../Service/API/Student-Assessment/student-assessment.service";
import { Assessment } from "../../../Modals/modals";
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-student-assesment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-assesment.component.html',
  styleUrl: './student-assesment.component.css'
})
export class StudentAssesmentComponent implements OnInit {

  TableView: number = 2;
  loginData!:any

  constructor(private StudentService: StudentService,
    private studentDataService: StudentDashDataService,
    private EnrollmentService:EnrollmentService,
    private readonly studentAssessmentService:StudentAssessmentService, 
  ) {
    const token = localStorage.getItem("token");
    if(token != null){
      const decode:any =jwtDecode(token)
      this.loginData = decode
    }
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

  assesmentLink: string = "";
  Data:any;
  examdataTransfer(assessment:Assessment) {
    this.assesmentLink = assessment.assessmentLink

    this.Data= {
      studentId:this.loginData.Id,
      assessmentId:assessment.id
    }

  
  }


  GoExam() {
    this.studentAssessmentService.addStudentAssessment(this.Data).subscribe({
      next:(response:any)=>{
      }
    })
    if (this.assesmentLink) {
      window.open(this.assesmentLink, '_blank');
    }

  }
}
