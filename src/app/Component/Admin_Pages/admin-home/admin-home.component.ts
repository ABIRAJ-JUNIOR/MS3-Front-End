import { Component } from '@angular/core';
import { StudentService } from '../../../Service/API/Student/student.service';
import { CommonModule } from '@angular/common';
import { SearchStudentsPipe } from '../../../Pipes/search-students.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Assessment, Course, Payment, Student } from '../../../Modals/modals';
import { PaymentService } from '../../../Service/API/Payment/payment.service';
import { CourseService } from '../../../Service/API/Course/course.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AssesmentService } from '../../../Service/API/Assessment/assesment.service';

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
  payments:Payment[] = [];
  assessments:Assessment[] = [];

  recentPayments: Payment[] = [];
  SearchText: string = '';

  totalpayments:number = 0;
  numberOfStudents: number = 0;
  numberOfCourses:number = 0;
  numberOfSchedules:number = 0;
  numberOfAssessments:number =0;

  constructor(
    private studentService: StudentService,
    private paymentService: PaymentService,
    private courseService: CourseService,
    private assessmentService:AssesmentService,
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadRecentPayments();
    this.loadCourses();
    this.loadAllPayments();
    this.loadAllAssessment();
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

  
  loadAllPayments():void{
    this.paymentService.getAllPayments().subscribe({
      next: (response: Payment[]) => {
        this.payments = response
      },
      complete:()=>{
        let fullPayment:number = 0;
        let installment:number = 0;
        this.payments.forEach(p => {
          this.totalpayments += p.amountPaid
          if(p.paymentType == "FullPayment"){
            fullPayment += p.amountPaid
          }else if(p.paymentType == "Installment"){
            installment += p.amountPaid
          }
        })
        this.totalpayments += this.students.length * 2500
        this.paymentData.push({name:"FullPayment" , value:fullPayment})
        this.paymentData.push({name:"Installment" , value:installment})
        this.paymentData.push({name:"Initial Amount" , value:this.students.length * 2500})
        this.paymentOverview = JSON.parse(JSON.stringify(this.paymentData))
      }
    })
  }

  loadAllAssessment(){
    this.assessmentService.getAllAssesment().subscribe({
      next: (response: Assessment[]) => {
        this.assessments = response
      },
      complete:()=>{
        this.numberOfAssessments = this.assessments.length
      }
    })
  }

  enrollData:ChartData[] = [];
  groupedEnrollmentStats: ChartData[] = [];

  paymentData:ChartData[]=[];
  paymentOverview = [];
 
}

interface ChartData {
  name: string;
  value: number;
}
