import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { AssesmentService } from '../../../Service/assesment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-content.component.html',
  styleUrl: './dash-content.component.css'
})
export class DashContentComponent implements OnInit {

  constructor(private assementService: AssesmentService) {

  }
  paginatedAssesment: any[] = [];

  ngOnInit() {
    this.paginateAssesment()
  }

  paginateAssesment() {
    this.assementService.getAllAssesment().subscribe((d: any) => {
      this.paginatedAssesment = d
      console.log(this.paginatedAssesment)
    }, (error) => {
      console.log(error)
    }
    )
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
