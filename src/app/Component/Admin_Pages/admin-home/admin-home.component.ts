import { Component } from '@angular/core';
import { StudentService } from '../../../Service/API/Student/student.service';
import { CommonModule } from '@angular/common';
import { SearchStudentsPipe } from '../../../Pipes/search-students.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Assessment, Course, FeedBack, Payment, PaymentOverView, Student } from '../../../Modals/modals';
import { PaymentService } from '../../../Service/API/Payment/payment.service';
import { CourseService } from '../../../Service/API/Course/course.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AssesmentService } from '../../../Service/API/Assessment/assesment.service';
import { FeedbackServiceService } from '../../../Service/API/Feedback/feedback-service.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchStudentsPipe,
    FormsModule,
    RouterModule,
    NgxChartsModule
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})

export class AdminHomeComponent {
  students: Student[] = [];
  courses: Course[] = [];
  assessments:Assessment[] = [];
  feedBacks:FeedBack[] = []

  recentPayments: Payment[] = [];
  SearchText: string = '';

  totalpayments:number = 0;
  numberOfStudents: number = 0;
  numberOfCourses:number = 0;
  numberOfSchedules:number = 0;
  numberOfAssessments:number =0;

  paymentOverview!:PaymentOverView

  constructor(
    private studentService: StudentService,
    private paymentService: PaymentService,
    private courseService: CourseService,
    private assessmentService:AssesmentService,
    private feedBackService:FeedbackServiceService,
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadRecentPayments();
    this.loadCourses();
    this.loadPaymentOverview()
    this.loadAllAssessment();
    this.loadFeedBacks();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (response: Student[]) => {
        this.students = response;
      },
      complete: () => {
        this.numberOfStudents = this.students.length
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  loadRecentPayments(): void {
    this.paymentService.recentPayment().subscribe({
      next: (response: Payment[]) => {
        this.recentPayments = response;
      },
    });
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (response: Course[]) => {
        this.courses = response;
      },
      complete: () => {
        this.numberOfCourses = this.courses.length
        this.courses.forEach((c) => {
          let EnrollCount = 0;
          c.schedules.forEach((s) => {
            this.numberOfSchedules ++ 
            EnrollCount += s.enrollCount;
          });
          this.enrollData.push({
            name: c.courseName,
            value: EnrollCount,
          });
        });
        this.groupedEnrollmentStats = JSON.parse(JSON.stringify(this.enrollData))
      },
    });
  }

  private loadPaymentOverview():void{
    this.paymentService.getPaymentOverview().subscribe({
      next:(response:PaymentOverView)=>{
        this.paymentOverview = response
        this.paymentData.push({name:"Total Amounts" , value:response.totalPayment})
        this.paymentData.push({name:"FullPayment" , value:response.fullPayment})
        this.paymentData.push({name:"Installment" , value:response.installment})
        this.paymentData.push({name:"Pending Amounts" , value:response.overDue})
        this.paymentChart = JSON.parse(JSON.stringify(this.paymentData))
      },error:(error:any)=>{
        console.log(error.error)
      }
    })
  }

  private loadAllAssessment():void{
    this.assessmentService.getAllAssesment().subscribe({
      next: (response: Assessment[]) => {
        this.assessments = response
      },
      complete:()=>{
        this.numberOfAssessments = this.assessments.length
      }
    })
  }

  private loadFeedBacks():void{
    this.feedBackService.getTopFeedBacks().subscribe({
      next:(response:FeedBack[])=>{
        this.feedBacks = response
      }
    })
  }

  enrollData:ChartData[] = [];
  groupedEnrollmentStats: ChartData[] = [];

  paymentData:ChartData[]=[];
  paymentChart = [];
 
}

interface ChartData {
  name: string;
  value: number;
}
