import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PaymentService } from '../../../Service/API/Payment/payment.service';
import { Payment, PaymentOverView } from '../../../Modals/modals';
import { DataTransferService } from '../../../Service/Data/Data_Transfer/data-transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './payments-overview.component.html',
  styleUrl: './payments-overview.component.css',
})
export class PaymentsOverviewComponent {
  transactions:Transaction[] = [];

  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;
  currentLength: number = 0;
  totalItems: number = 0;

  paymentOverview!:PaymentOverView
  
  constructor(
    private readonly paymentService:PaymentService,
    private readonly dataTransferService:DataTransferService,
    private readonly rout:Router
  ){

  }

  ngOnInit() {
    this.loadPaymentOverview();
    this.loadPaginatedPayments();
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

  private loadPaginatedPayments():void{
    this.paymentService.getPaginatedPayments(this.currentPage,this.pageSize).subscribe({
      next:(response:any)=>{
        this.transactions = response.items
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItem;
      },complete: () => {
        this.currentLength = this.transactions.length;
      },
      error: (error:any) => {
        console.log(error.error)
      }
    })
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPaginatedPayments();
    }
  }

  GoToInvoice(transaction:Transaction){
    this.dataTransferService.updateData(transaction)
    this.rout.navigate(['/admin-dashboard/invoice'])
  }
}


export interface Transaction{
  id:string;
  studentId:string;
  studentName:string;
  courseName:string;  
  amountPaid:number;
  paymentType:string;
  paymentMethod:string;
  transactionDate:Date;
  dueDate:Date;
}
