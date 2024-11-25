import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enrollment } from '../../Modals/modals';

@Injectable({
  providedIn: 'root'
})
export class PaymentapiServiceService {

  
  constructor(private http:HttpClient) { }

  EnrollmentUrl:string="https://localhost:7044/api/Enrollment"

  AddEnrollment(data:any){
   return this.http.post(this.EnrollmentUrl , data)
  }
}
