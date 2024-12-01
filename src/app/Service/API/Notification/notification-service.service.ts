import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {


  CommonUrl:string=environment.apiUrl
  constructor(private http:HttpClient) { }

  MarkAsReadNotication(NotificationId:string){
   return this.http.delete(this.CommonUrl+NotificationId)
  }
}
