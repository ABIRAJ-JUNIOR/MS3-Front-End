import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OtpVerficationService {

  apiUrl:string=environment.apiUrl
  constructor(private http:HttpClient) { }

   changePassword(payload:any) {
    const endpoint = `${this.apiUrl}/Otp/changePassword`;
    return this.http.post(endpoint, payload , {responseType:'text'});
  }

  sendOtp(payload:any) {
    const endpoint = `${this.apiUrl}/Otp/emailVerfication`;
    return this.http.post(endpoint, payload , {responseType:'text'});
  }

  verifyOtp(payload:any){
    const endpoint = `${this.apiUrl}/Otp/otpVerification`;
    return this.http.post(endpoint, payload, {responseType:'text'});
  }
}
