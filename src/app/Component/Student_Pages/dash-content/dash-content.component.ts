import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Chart, ChartConfiguration } from "chart.js";
import { Student } from "../../../Modals/modals";
import { StudentService } from "../../../Service/API/Student/student.service";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";

@Component({
  selector: 'app-dash-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-content.component.html',
  styleUrl: './dash-content.component.css'
})
export class DashContentComponent implements OnInit {

  StudentDetails: any;
  StudentTokenDetails: any;

  TotalPayments:number=0;
  TotalCourse:number=0;
  TotalAssignments:number=0;

  constructor(private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService, private router: Router) {
  }
  
  ngOnInit(): void {

    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.StudentDetails = student
      console.log(this.StudentDetails)

      this.totalPaymentCalculate()
      this.PaymentChartCalculation()
    })

  }


  totalPaymentCalculate(){
    for (let i:number = 0; i <  this.StudentDetails.enrollments.length; i++) {
      const element = this.StudentDetails.enrollments[i].paymentResponse;
      this.TotalAssignments += this.StudentDetails.enrollments[i].courseScheduleResponse.courseResponse.assessmentResponse.length
      console.log(element)
      for (let p:number = 0; p < element.length; p++) {
          this.TotalPayments+=Number(element[p].amountPaid)
      }
    }
  }

  PendingPayments:number=0;
  paidPayments:number=0
  PaymentChartCalculation(){
    for (let i:number = 0; i <  this.StudentDetails.enrollments.length; i++) {
      const element = this.StudentDetails.enrollments[i].paymentResponse;
      if (this.StudentDetails.enrollments[i].paymentStatus == "InProcess") {
        this.PendingPayments+=1
      }else if (this.StudentDetails.enrollments[i].paymentStatus) {
        this.paidPayments+=1
      }
    }
  }



  ngAfterViewInit() {
    this.createPaymentChart();
  }

 
  createPaymentChart() {
    new Chart('paymentChart', {
      type: 'doughnut',
      data: {
        labels: ['Paid', 'Pending'],
        datasets: [{
          data: [this.paidPayments, this.PendingPayments],
          backgroundColor: ['#28a745', '#6cc76e', '#b8e0b9'],
          hoverBackgroundColor: ['#1e7d32', '#58a654', '#a4d0a5']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true, position: 'top' } }
      } as ChartConfiguration['options']
    });
  }

 


}
