import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PayRequest } from '../../Component/Landing_Pages/otp-authentication/otp-authentication.component';

@Injectable({
  providedIn: 'root'
})
export class PaymentapiServiceService {

  
  constructor(private http:HttpClient) { }

  EnrollmentUrl:string="https://localhost:7044/api/Enrollment"
  PaymentUrl:string="https://localhost:7044/api/Payment"

  AddEnrollment(data:any){
   return this.http.post(this.EnrollmentUrl , data)
  }
  addPayment(data:PayRequest){
    return this.http.post(this.PaymentUrl,data)
  }
}
