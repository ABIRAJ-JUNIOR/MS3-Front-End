import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PaymentService } from '../../../Service/API/Payment/payment.service';
import { PaymentOverView } from '../../../Modals/modals';

@Component({
  selector: 'app-payments-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './payments-overview.component.html',
  styleUrl: './payments-overview.component.css',
})
export class PaymentsOverviewComponent {
  transactions = [
    { id: 1, studentName: 'John Doe', course: 'Web Development', amount: 500, status: 'Completed', date: '12/01/2024' },
    { id: 2, studentName: 'Jane Smith', course: 'Data Science', amount: 600, status: 'Pending', date: '12/02/2024' },
    { id: 3, studentName: 'Emily Clark', course: 'Python Programming', amount: 400, status: 'Completed', date: '12/03/2024' },
    { id: 4, studentName: 'Michael Brown', course: 'AI & Machine Learning', amount: 700, status: 'Pending', date: '12/04/2024' },
    { id: 5, studentName: 'Sarah Lee', course: 'Web Development', amount: 450, status: 'Completed', date: '12/05/2024' },
    { id: 6, studentName: 'Daniel White', course: 'JavaScript', amount: 500, status: 'Pending', date: '12/06/2024' },
    { id: 7, studentName: 'Matthew Green', course: 'Data Science', amount: 650, status: 'Completed', date: '12/07/2024' },
    { id: 8, studentName: 'Olivia Taylor', course: 'Python Programming', amount: 550, status: 'Pending', date: '12/08/2024' },
    { id: 9, studentName: 'James Black', course: 'AI & Machine Learning', amount: 750, status: 'Completed', date: '12/09/2024' },
    { id: 10, studentName: 'Sophia Johnson', course: 'Web Development', amount: 400, status: 'Pending', date: '12/10/2024' }
  ];

  pageSize = 5; // Number of records per page
  currentPage = 1;
  totalPages!: number;
  paginatedTransactions = [];
  pages = [];

  paymentOverview!:PaymentOverView
  constructor(
    private readonly paymentService:PaymentService
  ){

  }


  ngOnInit() {
    this.loadPaymentOverview();
  }

  private loadPaymentOverview():void{
    this.paymentService.getPaymentOverview().subscribe({
      next:(response:PaymentOverView)=>{
        this.paymentOverview = response
      },error:(error:any)=>{
        console.log(error.error)
      }
    })
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }


}
