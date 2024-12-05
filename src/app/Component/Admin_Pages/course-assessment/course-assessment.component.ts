import { Assessment, Course} from '../../../Modals/modals';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CourseService } from '../../../Service/API/Course/course.service';
import { AssesmentService } from '../../../Service/API/Assessment/assesment.service';
import { AuditlogService } from '../../../Service/API/AuditLog/auditlog.service';
import { jwtDecode } from 'jwt-decode';
import { AuditLogRequest } from '../student-list/student-list.component';

@Component({
  selector: 'app-course-assessment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,BsDatepickerModule],
  providers: [BsModalService],
  templateUrl: './course-assessment.component.html',
  styleUrl: './course-assessment.component.css'
})
export class CourseAssessmentComponent {
  assessments: Assessment[] = []; 
  courses: Course[] = [];


  currentPage: number = 1; 
  pageSize: number = 13; 
  totalPages: number = 0; 
  totalItems: number = 0; 
  currentLength: number = 0;

  isUpdate:boolean = false
  private assessmentId:string = ""
  assessmentForm!: FormGroup;

  loginData!:any

  constructor(
    private courseService: CourseService,
    private assessmentService:AssesmentService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private readonly auditLogService:AuditlogService
  ) {
    this.initializeForm();

    const token = localStorage.getItem("token");
    if(token != null){
      const decode:any =jwtDecode(token)
      this.loginData = decode
      console.log(this.loginData)
    }
  }

  ngOnInit(): void {
    this.loadItems(); 
    this.loadCourses();
  }

  private initializeForm(): void {
    this.assessmentForm = this.fb.group({
      assessmentTitle: ['', Validators.required],
      courseId: ['', Validators.required],
      assessmentType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      totalMarks: ['', Validators.required],
      passMarks: ['', Validators.required],
      assessmentLink: [''],
      assessmentStatus:['']
    });
  }

  loadItems(): void {
    this.assessmentService.assessmentPagination(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.assessments = response.items;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItem; 
      },
      complete: () => {
        this.currentLength = this.assessments.length; 
      }
    });
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page; 
      this.loadItems();
    }
  }

  onSubmit(): void {
    if (this.assessmentForm.valid) {
      const formData = this.assessmentForm.value;

      const assessment: AssessmentRequest = {
        courseId: formData.courseId,
        assessmentTitle: formData.assessmentTitle,
        assessmentType: Number(formData.assessmentType), 
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalMarks: formData.totalMarks,
        passMarks: formData.passMarks,
        assessmentLink:formData.assessmentLink,
        assessmentStatus:Number(formData.assessmentStatus)
      };

      if(this.isUpdate){
        this.updateAssessment(assessment);
      }else{
        this.addAssessment(assessment);
      }

    } else {
      this.toastr.warning('Please fill out all required fields correctly', '');
    }
  }


  private addAssessment(assessment:AssessmentRequest):void{
    this.assessmentService.addAssessment(assessment).subscribe({
      next: (response: Assessment) => {
        this.toastr.success('Assessment Create successfull', '');
        this.assessmentForm.reset();
        this.loadItems(); 

        const auditLog:AuditLogRequest = {
          action: 'Add Assessment',
          details: `Added a new assessment for Course ID (${response.id}). Assessment Type: "${response.assessmentType}", Scheduled Date: ${new Date(response.startDate).toDateString()}.`,
          adminId: this.loginData.Id,
        }
        this.auditLogService.addAuditLog(auditLog).subscribe({
          next:()=>{},
          error: (error: any) => {
            console.error('Error adding audit log:', error.error);
          }
        })
      },
      error: (err: any) => {
        this.toastr.warning(err.error, '');
      }
    });
  }

  private updateAssessment(assessment:AssessmentRequest):void{
    assessment.startDate = new Date(assessment.startDate)
    assessment.endDate = new Date(assessment.endDate)
    this.assessmentService.updateAssessment(this.assessmentId,assessment).subscribe({
      next: (response:Assessment) => {
        this.toastr.success('Update successfull', '');
        this.assessmentForm.reset();
        this.loadItems(); 

        const auditLog:AuditLogRequest = {
          action: 'Update Assessment',
          details: `Updated assessment details for Course ID (${response.id}).`,
          adminId: this.loginData.Id,
        }
        this.auditLogService.addAuditLog(auditLog).subscribe({
          next:()=>{},
          error: (error: any) => {
            console.error('Error adding audit log:', error.error);
          }
        })
      },
      error: (err: any) => {
        this.toastr.warning(err.error, '');
      }
    });
  }

  editAssessment(isEditmode:boolean):void{
    this.isUpdate = isEditmode
    if(!isEditmode){
      this.assessmentForm.reset({
        assessmentType:"",
        courseId:""
      })
    }
  }

  patchData(assessment:Assessment):void{
    this.assessmentId = assessment.id;
    this.assessmentForm.patchValue({
      assessmentTitle:assessment.assessmentTitle,
      courseId:assessment.courseId,
      assessmentType:AssessmentType[assessment.assessmentType as keyof typeof AssessmentType],
      startDate:new Date(assessment.startDate).toLocaleString(),
      endDate:new Date(assessment.endDate).toLocaleString(),
      totalMarks:assessment.totalMarks,
      passMarks:assessment.passMarks,
      assessmentLink:assessment.assessmentLink,
      assessmentStatus:AssessmentStatus[assessment.assessmentStatus as keyof typeof AssessmentStatus],
    })
    this.isUpdate = true
  }
  
}

export interface AssessmentRequest{
  courseId:string;
  assessmentTitle:string
  assessmentType:number;
  startDate:Date;
  endDate:Date;
  totalMarks:number;
  passMarks:number;
  assessmentLink:string;
  assessmentStatus:number
} 

enum AssessmentType
{
    Quiz = 1,
    Exam = 2,
    Presentation = 3,
    Practical = 4,
    OnlineTest = 5,
    Midterm = 6,
    FinalExam = 7,
    MockTest = 8,
    LabAssessment = 9,
    OpenBookTest = 10,
}

enum AssessmentStatus
{
    NotStarted = 1,   
    InProgress = 2,
    Completed = 3,
    Closed = 4
}
