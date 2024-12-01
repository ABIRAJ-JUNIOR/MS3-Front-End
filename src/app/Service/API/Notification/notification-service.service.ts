import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {


  CommonUrl:string="https://localhost:7044/api/Notification/"
  constructor(private http:HttpClient) { }

  MarkAsReadNotication(NotificationId:string){
   return this.http.delete(this.CommonUrl+NotificationId)
  }
}
