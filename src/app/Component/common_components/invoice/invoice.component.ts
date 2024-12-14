import { Component, OnInit } from '@angular/core';
import { Payment, Student } from '../../../Modals/modals';
import { DataTransferService } from '../../../Service/Data/Data_Transfer/data-transfer.service';
import { Transaction } from '../../Admin_Pages/payments-overview/payments-overview.component';
import { StudentService } from '../../../Service/API/Student/student.service';
import { CommonModule } from '@angular/common';
import { MailServiceService } from '../../../Service/API/Mail/mail-service.service';
import { ToastrService } from 'ngx-toastr';

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
    private readonly studentService:StudentService,
    private readonly mailService:MailServiceService,
    private readonly toastr:ToastrService
  ){

  }

  ngOnInit(): void {
    this.dataTransferService.currentData.subscribe((data) => {
      this.data = data
      console.log(data)
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

  async downloadInvoice() {
    try {
      const element = document.getElementById('invoiceContent');
      if (!element) {
        console.error('Invoice content element not found!');
        return;
      }
  
      const html2canvas = (await import('html2canvas')).default;
  
      const canvas = await html2canvas(element, {
        scale: 3, 
        useCORS: true, 
        backgroundColor: '#ffffff', 
      });
  
      const imageData = canvas.toDataURL('image/png', 1.0);
  
      const link = document.createElement('a');
      link.href = imageData;
  
      const firstName = this.studentData?.firstName || 'Student';
      const lastName = this.studentData?.lastName || 'Invoice';
  
      link.download = `${firstName}-${lastName}.png`;
      link.click();
    } catch (error) {
      console.error('Error generating invoice PNG:', error);
    }
  }
  

  sendEmail() {
    const invoice:Invoice = {
      invoiceId: this.data.id,
      studentId: this.data.studentId,
      studentName:this.data.studentName,
      email:this.studentData.email,
      address:this.studentData.address != null ? `${this.studentData.address.addressLine1}, ${this.studentData.address.addressLine2}, ${this.studentData.address.city}, ${this.studentData.address.country}` : "",
      courseName:this.data.courseName,
      amountPaid:this.data.amountPaid,
      paymentType:this.data.paymentType,
      emailType:2
    }

    this.mailService.sendInvoiceMail(invoice).subscribe({
      next:(response:any)=>{
        this.toastr.success("Mail Send Successfully" ,'');
      },
      error:(error:any)=>{
        console.log(error.error);
        
      }
    })
  }
}

export interface Invoice{
  invoiceId:string;
  studentId:string;
  studentName:string;
  email:string;
  address:string;
  courseName:string;  
  amountPaid:number;
  paymentType:string;
  emailType:number;
}
