import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../../Modals/modals';
import { StudentDashDataServiceService } from '../../../Service/Student/student-dash-data-service.service';
import { StudentService } from '../../../Service/Student/student.service';
import { CommonModule } from '@angular/common';
import { PaymentDataService } from '../../../Service/Payment/payment-data.service';

@Component({
  selector: 'app-student-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-payments.component.html',
  styleUrl: './student-payments.component.css'
})
export class StudentPaymentsComponent implements OnInit {
  constructor(private StudentDashDataService: StudentDashDataServiceService,
    private StudentApiService: StudentService,
    private router: Router,
    private PaymentService: PaymentDataService
  ) {
  }

  Enrollments: any;
  StudentTokenDetails: any;
  NoImage: string = "https://cdn-icons-png.flaticon.com/512/9193/9193906.png"

  ngOnInit(): void {

    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.Enrollments = student.enrollments
      console.log(this.Enrollments)
    }
      ,
      (error) => {
        this.router.navigate([''])
      })

  }

  calculatePaymentProgress(amountPaid: number, courseFee: number): number {
    return (amountPaid / courseFee) * 100;
  }

  calculateProgressColor(progress: number): string {
    if (progress < 40) {
      return 'bg-danger';
    } else if (progress < 60) {
      return 'bg-warning';
    } else {
      return 'bg-success';
    }
  }

  InstallmentPayment: any;

 
  payClick(data: any) {
   
    this.InstallmentPayment = data;
    console.log()
  }

  ConfirmationPayment() {
    let PurchaseDetails={
      ...this.InstallmentPayment,
      "PaymentCheck":false
    }
    this.PaymentService.PurchaseDetailsSetLocal(PurchaseDetails);
  }
  cancelPayment(){
    this.InstallmentPayment=""
  }
}
