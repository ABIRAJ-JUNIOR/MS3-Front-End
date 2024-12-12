import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from '../../../Modals/modals';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {


  CommonUrl:string=environment.apiUrl
  constructor(private http:HttpClient) { }

  MarkAsReadNotication(NotificationId:string){
   return this.http.delete(this.CommonUrl +"/Notification/"+NotificationId ,  { responseType: 'text' })
  }

  getAllNotificationsByStudentId(studentId:string){
    return this.http.get<Notification[]>(this.CommonUrl +"/Notification/"+ studentId)
  }
}
