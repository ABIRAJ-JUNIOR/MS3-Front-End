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
    }
      ,
      (error) => {
        this.router.navigate([''])
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
    this.createEnrollmentChart();
    this.createPaymentChart();
    this.createPopularityChart();
  }

  createEnrollmentChart() {
    new Chart('enrollmentChart', {
      type: 'bar',
      data: {
        labels: ['Course A', 'Course B', 'Course C'],
        datasets: [{
          label: 'Enrollments',
          data: [45, 25, 30],
          backgroundColor: ['#4e73df', '#6a9afe', '#9bb8ff'],
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true, position: 'top' } },
        scales: { x: { beginAtZero: true }, y: { beginAtZero: true } }
      } as ChartConfiguration['options']
    });
  }

  createPaymentChart() {
    new Chart('paymentChart', {
      type: 'doughnut',
      data: {
        labels: ['Paid', 'Pending', 'Overdue'],
        datasets: [{
          data: [this.paidPayments, this.PendingPayments, 15],
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

  createPopularityChart() {
    new Chart('popularityChart', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Popularity Trend',
          data: [20, 40, 35, 50, 60],
          borderColor: '#ffc107',
          backgroundColor: 'rgba(255, 193, 7, 0.2)',
          fill: true,
          tension: 0.3 // Smooth the line curve
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true, position: 'top' } },
        scales: { x: { beginAtZero: true }, y: { beginAtZero: true } }
      } as ChartConfiguration['options']
    });
  }


}
