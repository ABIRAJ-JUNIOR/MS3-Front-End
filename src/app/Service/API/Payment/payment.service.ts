import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PayRequest } from '../../../Component/Landing_Pages/otp-authentication/otp-authentication.component';
import { Payment } from '../../../Modals/modals';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http:HttpClient) { }

  private apiUrl = 'https://localhost:7044/api'

  AddEnrollment(data:any){
   return this.http.post(this.apiUrl + "/Enrollment", data)
  }
  addPayment(data:PayRequest){
    return this.http.post(this.apiUrl+"/Payment",data)
  }
  recentPayment(){
    return this.http.get<Payment[]>(this.apiUrl + '/Payment/Recent')
  }
  getAllPayments(){
    return this.http.get<Payment[]>(this.apiUrl + '/Payment/GetAll')
  }
}
