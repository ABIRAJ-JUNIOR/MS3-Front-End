import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Chart, ChartConfiguration } from "chart.js";
import { Student } from "../../../Modals/modals";
import { StudentService } from "../../../Service/API/Student/student.service";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { CourseService } from "../../../Service/API/Course/course.service";
import { LoadingService } from "../../../Service/Loading/loading.service";

@Component({
  selector: 'app-dash-content',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dash-content.component.html',
  styleUrl: './dash-content.component.css'
})
export class DashContentComponent implements OnInit {

  StudentDetails: any;
  StudentTokenDetails: any;

  TotalPayments: number = 0;
  TotalAssignments: number = 0;

  totalCourse: number = 0;


  constructor(private loding: LoadingService, private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService, private router: Router, private CourseService: CourseService) {
  }

  ngOnInit(): void {
    this.loding.show()

    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.StudentDetails = student
      console.log(this.StudentDetails)

      this.totalPaymentCalculate()
      this.ChartCalculation()
    }, (error) => {
      console.log(error)
    })

    this.CourseService.getCourses().subscribe((data: any) => {
      this.totalCourse = data.length
    }, (error) => {
      console.log(error)
    }, () => {
      this.loding.hide()
    })

  }


  totalPaymentCalculate() {
    for (let i: number = 0; i < this.StudentDetails.enrollments.length; i++) {
      const element = this.StudentDetails.enrollments[i].paymentResponse;
      this.TotalAssignments += this.StudentDetails.enrollments[i].courseScheduleResponse.courseResponse.assessmentResponse.length
      console.log(element)
      for (let p: number = 0; p < element.length; p++) {
        this.TotalPayments += Number(element[p].amountPaid)
      }
    }
  }

  PendingPayments: number = 0;
  paidPayments: number = 0;
  TotalPayment: number = 0;

  EnrolledCourses: number = 0;
  PaymentData: any[] = []
  ChartCalculation() {
    this.loding.show()

    for (let i: number = 0; i < this.StudentDetails.enrollments.length; i++) {
      const element = this.StudentDetails.enrollments[i].paymentResponse;
      if (this.StudentDetails.enrollments[i].paymentStatus == "InProcess") {
        this.PendingPayments += 1

        for (let installment = 0; installment < this.StudentDetails.enrollments[i].paymentResponse.length; installment++) {
          const element = this.StudentDetails.enrollments[i].paymentResponse[installment];

          this.TotalPayment += 1
        }
      } else if (this.StudentDetails.enrollments[i].paymentStatus == "Paid") {
        this.paidPayments += 1
      }
    }
    console.log(this.PendingPayments)
    console.log(this.paidPayments)
    this.PaymentData = [
      { name: 'Completed', value: this.paidPayments },
      { name: 'Pending', value: this.PendingPayments },
      { name: 'TotalPayments', value: this.TotalPayment },
    ];
    this.createCourseChart()
    this.loding.hide()

  }

  gradient: boolean = false;
  animations: boolean = true;






  courseData: any[] = []

  createCourseChart() {
    this.courseData = [
      { name: 'Assignments', value: this.TotalAssignments },
      { name: 'Enrolled Course', value: this.StudentDetails.enrollments.length },
      { name: 'TotalCourses', value: this.totalCourse },
    ];
  }







}
