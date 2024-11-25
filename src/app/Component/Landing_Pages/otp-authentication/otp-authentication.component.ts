import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentDataService } from '../../../Service/Payment/payment-data.service';

@Component({
  selector: 'app-otp-authentication',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './otp-authentication.component.html',
  styleUrl: './otp-authentication.component.css'
})
export class OtpAuthenticationComponent implements OnInit{
  constructor(private paymentDataService:PaymentDataService){

  }
  otp:string="";

  ngOnInit(): void {
    this.getOtp()
  }
  getOtp(){
    this.otp=  this.paymentDataService.GetOtp()
  }

}
