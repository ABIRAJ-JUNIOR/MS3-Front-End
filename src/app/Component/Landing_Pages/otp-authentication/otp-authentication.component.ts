import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PaymentDataService } from '../../../Service/Payment/payment-data.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentapiServiceService } from '../../../Service/Paymentapi/paymentapi-service.service';

@Component({
  selector: 'app-otp-authentication',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './otp-authentication.component.html',
  styleUrl: './otp-authentication.component.css'
})
export class OtpAuthenticationComponent implements OnInit {
  constructor(private router: Router, private paymentDataService: PaymentDataService, private toastr: ToastrService, private PaymentApiServices: PaymentapiServiceService) {

  }
  otp: string = "";

  ngOnInit(): void {
    this.getOtp();

  }

  getOtp() {
    this.otp = this.paymentDataService.GetOtp()
    this.toastr.clear();
    this.toastr.success('Your Otp is  ' + this.otp)
  }

  CheckOtp() {
    let enteredOtp = document.getElementById('otp') as HTMLInputElement
    if (enteredOtp.value == this.otp) {
      this.toastr.clear();
      let data: any = JSON.parse(this.paymentDataService.getPendingPayment());
      console.log(data)
      console.log(data.installmentNumber)

      if (data.installmentNumber <= 1) {
        this.PaymentApiServices.AddEnrollment(data).subscribe(
          (d: any) => {
            this.toastr.success('Your Payment is successful');
            this.paymentDataService.ClearAllPAymentData()
            this.router.navigate(['/student-dashboard'])
          },
          (error) => {
            this.toastr.error('There was an error processing your payment. Please try again later.');
          }
        )
      } else {
        this.PaymentApiServices.addPayment(data).subscribe(
          (d: any) => {
            this.toastr.success('Your Payment is successful');
            this.paymentDataService.ClearAllPAymentData()
            this.router.navigate(['/student-dashboard'])
          },
          (error) => {
            this.toastr.error('There was an error processing your payment. Please try again later.');
          }
        )
      }

    } else {
      this.toastr.clear();
      this.toastr.error("Invalid OTP. Ensure you're entering the correct code.")
    }
  }





}
