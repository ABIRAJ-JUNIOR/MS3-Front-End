import { Component, OnInit } from '@angular/core';
import { StudentService} from '../../../Service/API/Student/student.service';
import { CommonModule } from '@angular/common';
import { SearchStudentsPipe } from '../../../Pipes/search-students.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Chart, ChartConfiguration } from 'chart.js';
import { Student } from '../../../Modals/modals';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, SearchStudentsPipe, FormsModule, RouterModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent{
  students:Student[] = []
  SearchText:string = ""
  numberOfStudents:number = 0
  constructor(private studentService:StudentService){}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next:(response:Student[]) => {
        this.students = response
      },complete:() =>{
        this.students.forEach(s=>{
          this.numberOfStudents ++ 
        })
      },error:(err:any)=>{
        console.log(err)
      }
    })
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
          data: [55, 30, 15],
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
