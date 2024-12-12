import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../../../Component/common_components/invoice/invoice.component';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  commonUrl:string=environment.apiUrl
  constructor(private http:HttpClient) { }

  sendOtpMail(otpDetails:any){
    return this.http.post(this.commonUrl+"/SendMail/OTP",otpDetails , {responseType:'text'})
  }

  sendInvoiceMail(InvoiceDetails:Invoice){
    return this.http.post(this.commonUrl+"/SendMail/Invoice",InvoiceDetails , {responseType:'text' })
  }
}
