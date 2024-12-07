import { Component, OnInit } from '@angular/core';
import { Payment, Student } from '../../../Modals/modals';
import { DataTransferService } from '../../../Service/Data/Data_Transfer/data-transfer.service';
import { Transaction } from '../../Admin_Pages/payments-overview/payments-overview.component';
import { StudentService } from '../../../Service/API/Student/student.service';
import { ResolveEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit{
  data!:Transaction;
  studentData!:Student

  constructor(
    private readonly dataTransferService:DataTransferService,
    private readonly studentService:StudentService
  ){

  }

  ngOnInit(): void {
    this.dataTransferService.currentData.subscribe((data) => {
      this.data = data
    })

    this.studentService.getStudent(this.data.studentId).subscribe({
      next:(response:Student)=>{
        this.studentData = response
      },
      error:(error:any)=>{
        console.log(error.error);
      }
    })
  }


  goBack() {
    window.history.back()
  }

  downloadInvoice() {
    const element = document.getElementById('invoiceContent');
    if (!element) {
      console.error('Element not found!');
      return;
    }
    html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
    })
      .then((canvas:any) => {
        const imageData = canvas.toDataURL('image/png', 1.0);

        const link = document.createElement('a');
        link.href = imageData;
        link.download = `${this.studentData.firstName}-${this.studentData.lastName}.png`;
        link.click();
      })
      .catch((err:any) => console.error('Error generating high-quality PNG:', err));
  }

  sendEmail() {
  }
}
