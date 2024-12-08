import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  commonUrl:string=environment.apiUrl
  constructor(private http:HttpClient) { }

  sendMail(otpDetails:any){
    return this.http.post(this.commonUrl+"/SendMail/OTP",otpDetails , {responseType:'text'})
  }
}
