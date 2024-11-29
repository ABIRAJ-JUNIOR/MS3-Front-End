import { Injectable } from '@angular/core';
import { Payment } from '../../../Modals/modals';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http:HttpClient) { }

  private apiUrl = 'https://localhost:7044/api'

  AddEnrollment(data:any){
   return this.http.post(this.apiUrl + "/Enrollment", data)
  }
  recentPayment(){
    return this.http.get<Payment[]>(this.apiUrl + '/Payment/Recent')
  }
  getAllPayments(){
    return this.http.get<Payment[]>(this.apiUrl + '/Payment/GetAll')
  }
}
