import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentDataService } from '../../../Service/Payment/payment-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-authentication',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './otp-authentication.component.html',
  styleUrl: './otp-authentication.component.css'
})
export class OtpAuthenticationComponent implements OnInit {
  constructor(private paymentDataService: PaymentDataService, private toastr: ToastrService) {

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

      this.toastr.success('Your Payment succesfull')
    } else {
      this.toastr.clear();
      this.toastr.error("Enter Valid OTP")
    }
  }





}
