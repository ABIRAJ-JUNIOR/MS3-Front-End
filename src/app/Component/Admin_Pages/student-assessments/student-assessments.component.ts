import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentAssessmentService } from '../../../Service/API/Student-Assessment/student-assessment.service';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Course, StudentAssessment } from '../../../Modals/modals';
import { CourseService } from '../../../Service/API/Course/course.service';
import { SearchStudentAssessmentPipe } from '../../../Pipes/search-student-assessment.pipe';
import { jwtDecode } from 'jwt-decode';
import { AuditLogRequest } from '../student-list/student-list.component';
import { AuditlogService } from '../../../Service/API/AuditLog/auditlog.service';

@Component({
  selector: 'app-student-assessments',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,SearchStudentAssessmentPipe],
  templateUrl: './student-assessments.component.html',
  styleUrl: './student-assessments.component.css'
})
export class StudentAssessmentsComponent implements OnInit {

  studentAssessments: StudentAssessment[] = [];
  courses:Course[] = []; 
  evaluationForm: FormGroup;
  searchText:string =''
  studentAssessmentId!:string;

  loginData!:any

  constructor(
    private readonly studentAssessmentService: StudentAssessmentService,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly courseService:CourseService,
    private readonly auditLogService:AuditlogService
  ) {
    this.evaluationForm = this.fb.group({
      marksObtaines: ['', [Validators.required, Validators.min(0)]],
      feedback: ['', Validators.required],
    });

    const token = localStorage.getItem("token");
    if(token != null){
      const decode:any =jwtDecode(token)
      this.loginData = decode
      console.log(this.loginData)
    }
  }

  ngOnInit(): void {
    this.loadStudentAssessments();
    this.loadCourses();
  }

  loadStudentAssessments():void{
    this.studentAssessmentService.getAllStudentAssessment().subscribe({
      next:(response:StudentAssessment[]) => {
        this.studentAssessments = response
      },
      error:(error:any)=>{
        console.log(error.error);
      }
    })
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data: Course[]) => {
        this.courses = data
      }
    });
  }

  search(searchText:string){
    this.searchText = searchText
    console.log(this.searchText)
  }

  assessmentDetails = {
    title: 'JavaScript Basics',
    studentName: 'John Doe',
    submissionDate: new Date(),
    maxMarks: 100,
  };

  patchData(studentAssessment:StudentAssessment){
    this.assessmentDetails.title = studentAssessment.assessmentResponse.assessmentTitle
    this.assessmentDetails.studentName = `${studentAssessment.studentResponse.firstName} ${studentAssessment.studentResponse.lastName}`
    this.assessmentDetails.submissionDate = studentAssessment.dateSubmitted
    this.assessmentDetails.maxMarks = studentAssessment.assessmentResponse.totalMarks

    this.evaluationForm.patchValue({
      marksObtaines: studentAssessment.marksObtaines,
      feedback: studentAssessment.feedBack
    })
    
    this.studentAssessmentId = studentAssessment.id
  }

  onSubmit() {
    if (this.evaluationForm.valid) {
      this.studentAssessmentService.evaluateAssessment(this.studentAssessmentId , this.evaluationForm.value).subscribe({
        next: (response:StudentAssessment) => {
          this.toastr.success("Evaluate successfull" , "" , )

          const auditLog:AuditLogRequest = {
            action: 'Evaluate Student Assessment',
            details: `Evaluated assessment for student ID (${response.studentId}). Marks awarded: ${response.marksObtaines}.`,
            adminId: this.loginData.Id,
          }
          this.auditLogService.addAuditLog(auditLog).subscribe({
            next:()=>{},
            error: (error: any) => {
              console.error('Error adding audit log:', error.error);
            }
          })
        },
        complete:()=>{
          this.loadStudentAssessments();
        },
        error:(error:any)=>{
          this.toastr.warning(error.error , "" , )
        }
      })
    }
  }

}


export interface EvaluateRequest{
  marksObtaines:number;
  feedBack:string;
}