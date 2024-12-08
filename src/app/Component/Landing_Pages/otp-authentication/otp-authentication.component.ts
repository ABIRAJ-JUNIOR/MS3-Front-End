import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PaymentDataService } from "../../../Service/Data/Payment_Data/payment-data.service";
import { PaymentService } from "../../../Service/API/Payment/payment.service";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { MailServiceService } from "../../../Service/API/Mail/mail-service.service";

@Component({
  selector: 'app-otp-authentication',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './otp-authentication.component.html',
  styleUrl: './otp-authentication.component.css'
})
export class OtpAuthenticationComponent implements OnInit {
  constructor(private mailService: MailServiceService,
    private studentDataService: StudentDashDataService,
    private router: Router,
    private paymentDataService: PaymentDataService,
     private toastr: ToastrService,
    private PaymentApiServices: PaymentService
  ) {

  }

  otp: string = "";

  ngOnInit(): void {
    this.getOtp();
  }

  getOtp() {
    this.otp = this.paymentDataService.GetOtp()
  }

  CheckOtp() {
    let enteredOtp = document.getElementById('otp') as HTMLInputElement
    if (enteredOtp.value == this.otp) {
      this.toastr.clear();
      this.toastr.success('successfull')
      let data: any = JSON.parse(this.paymentDataService.getPendingPayment());
 

      if (data.PaymentCheck) {
        let Enrollment = {
          studentId: data.studentId,
          courseScheduleId: data.courseScheduleId,
          paymentRequest: {
            paymentType: Number(data.paymentRequest.paymentType),
            paymentMethod: data.paymentRequest.paymentMethod,
            amountPaid: Number(data.paymentRequest.amountPaid),
            installmentNumber: data.paymentRequest.installmentNumber
          }
        }


        this.PaymentApiServices.AddEnrollment(Enrollment).subscribe({
          next: (response: any) => {
            this.toastr.success("Your Payment is SuccessFully Completed")
            this.paymentDataService.ClearAllPAymentData()
            this.router.navigate(['/student-dashboard'])
          }, error: (error) => {
            this.toastr.error('There was an error processing your payment. Please try again later.');
          }
        })
      } else {
        let Payment: PayRequest = {
          paymentType: Number(data.paymentType),
          paymentMethod: Number(data.paymentMethod),
          amountPaid: Number(data.amountPaid),
          installmentNumber: Number(data.installmentNumber),
          enrollmentId: data.enrollmentId
        }

        this.PaymentApiServices.addPayment(Payment).subscribe({
          next: () => {
            this.toastr.success('Your Installment Payment is successful');
            this.paymentDataService.ClearAllPAymentData()
            this.router.navigate(['/student-dashboard'])
          }, error: () => {
            this.toastr.error('There was an error processing your payment. Please try again later.');
          }
        })
      }

    } else {
      this.toastr.clear();
      this.toastr.error("Invalid OTP. Ensure you're entering the correct code.")
    }
  }


  sendOtpMail() {
    const studentToken = this.studentDataService.GetStudentDeatilByLocalStorage()
    if (this.paymentDataService.generateRandomNumber()) {
      this.otp = this.paymentDataService.GetOtp()
      let mail: any = {
        name: studentToken.Name,
        otp: this.otp,
        email: studentToken.Email,
        emailType: 1
      }
      this.mailService.sendOtpMail(mail).subscribe({
        next: () => {
          this.toastr.success("Mail Recieved Succesfully")
        }, error: () => {
          this.toastr.error("Otp Send Failed")
        }
      })
  
    }
   
  }

}

//Interface For Payment Request

export interface PayRequest {
  paymentType: number;
  paymentMethod: number;
  amountPaid: number;
  installmentNumber: number;
  enrollmentId: string;
}