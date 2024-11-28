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


  payCheck: string = "InProcess"

  Enrollments: any;

  NewEnrollment: any[] = [];
  NewEnrollmentLength: number = 0
  StudentTokenDetails: any;
  NoImage: string = "https://cdn-icons-png.flaticon.com/512/9193/9193906.png"

  ngOnInit(): void {

    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.Enrollments = student.enrollments



      this.Enrollments.forEach((element: any) => {
        let amount: number = 0
        element.paymentResponse.forEach((data: any) => {
          amount += Number(data.amountPaid)
        })
        let payment = {
          ...element,
          paidTotal: Number(amount)
        }
        this.NewEnrollment.push(payment)
        console.log(this.NewEnrollment)
      });



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
    let PurchaseDetails = {
      ...this.InstallmentPayment,
      "PaymentCheck": false
    }
    console.log(this.InstallmentPayment)
    if (this.InstallmentPayment.paymentStatus == "InProcess") {
      this.PaymentService.PurchaseDetailsSetLocal(PurchaseDetails);

    } else {
    }
  }
  cancelPayment() {
    this.InstallmentPayment = ""
  }
}
