import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../../../Modals/modals';

@Injectable({
  providedIn: 'root'
})
export class PatmentService {

  constructor(private http:HttpClient) { }

  EnrollmentUrl:string="https://localhost:7044/api/"

  AddEnrollment(data:any){
   return this.http.post(this.EnrollmentUrl + "Enrollment", data)
  }

  recentPayment(){
    return this.http.get<Payment[]>(this.EnrollmentUrl + 'Payment/Recent')
  }
}
