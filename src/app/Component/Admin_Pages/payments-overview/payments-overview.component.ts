import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-payments-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './payments-overview.component.html',
  styleUrl: './payments-overview.component.css',
})
export class PaymentsOverviewComponent {
  payments = [
    {
      studentName: 'John Doe',
      paymentType: 'Installment',
      amountPaid: 15000,
      outstanding: 5000,
      dueDate: new Date('2024-12-10'),
    },
    {
      studentName: 'Jane Smith',
      paymentType: 'Full Payment',
      amountPaid: 25000,
      outstanding: 0,
      dueDate: new Date('2024-11-25'),
    },
  ];

  viewDetails(payment: any) {
    alert(`Viewing details for ${payment.studentName}`);
  }

  // Summary data
  totalPayments = 125000;
  outstandingPayments = 35000;
  completedInstallments = 120;
  pendingInstallments = 15;

  paymentTrendsData = [
    {
      name: 'January',
      series: [
        { name: 'Installment 1', value: 10000 },
        { name: 'Installment 2', value: 5000 },
      ],
    },
    {
      name: 'February',
      series: [
        { name: 'Installment 1', value: 12000 },
        { name: 'Installment 2', value: 6000 },
      ],
    },
  ];

  outstandingBreakdownData = [
    { name: 'Completed Payments', value: 85 },
    { name: 'Outstanding Payments', value: 15 },
  ];
  
}

interface ChartData {
  name: string;
  value: number;
}