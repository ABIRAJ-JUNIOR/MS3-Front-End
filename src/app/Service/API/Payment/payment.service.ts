import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PayRequest } from '../../../Component/Landing_Pages/otp-authentication/otp-authentication.component';
import { Payment, PaymentOverView } from '../../../Modals/modals';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http:HttpClient) { }

  private apiUrl = environment.apiUrl

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
  getPaymentOverview(){
    return this.http.get<PaymentOverView>(this.apiUrl + '/Payment/PaymentOverView')
  }
  getPaginatedPayments(pageNumber:number, pageSize:number){
    return this.http.get(this.apiUrl + `/Payment/Pagination/${pageNumber}/${pageSize}`)
  }

}
