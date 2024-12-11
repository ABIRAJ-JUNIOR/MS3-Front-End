import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpVerficationService {

  apiUrl:string=environment.apiUrl
  constructor(private http:HttpClient) { }

   changePassword(payload:any): Observable<any> {
    const endpoint = `${this.apiUrl}/changePassword`;
    return this.http.post(endpoint, payload);
  }

  sendOtp(payload:any): Observable<any> {
    const endpoint = `${this.apiUrl}/sendOtp`;
    return this.http.post(endpoint, payload);
  }

  verifyOtp(payload:any): Observable<any> {
    const endpoint = `${this.apiUrl}/verifyOtp`;
    return this.http.post(endpoint, payload);
  }
}
