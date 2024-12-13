import { CommonModule } from '@angular/common';
import { Component, OnInit, makeStateKey } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationServiceService } from '../../../Service/API/Notification/notification-service.service';
import { jwtDecode } from 'jwt-decode';
import { Notification as AppNotification, Notification } from '../../../Modals/modals';
import { SearchNotificationPipe } from '../../../Pipes/search-notification.pipe';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchNotificationPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notifications:AppNotification[] = [];
  searchQuery: string = '';
  loginData!:any
  constructor(private readonly notificationService:NotificationServiceService){
    const token = localStorage.getItem("token");
    if(token != null){
      const decode:any =jwtDecode(token)
      this.loginData = decode
    }
  }

  ngOnInit(): void {
    this.loadNotification();
  }

  private loadNotification():void{
    this.notificationService.getAllNotificationsByStudentId(this.loginData.Id).subscribe({
      next:(response:AppNotification[])=>{
        this.notifications = response
      },
      complete:()=>{
        this.notifications.forEach(n => {
          n.isExpand = false
        })
      },
      error:(error:any)=>{
        console.log(error.error);
      }

    })
  }

  toggleNotification(notification:Notification): void {
    if(!notification.isExpand){
      notification.isExpand = true
      if(!notification.isRead){
        this.notificationService.MarkAsReadNotication(notification.id).subscribe({
          next: (response: any) => {
          },
          error:(error:any)=>{
            console.log(error.error)
          }
        })
      }
      notification.isRead = true
    }else{
      notification.isExpand = false
    }
  }

  deleteNotification(id:string){
    this.notificationService.deleteNotification(id).subscribe({
      next:(response:any)=>{
        this.loadNotification();

      },
      error:(error:any)=>{
        console.log(error.error)
      }
    })
  }

  goBack(): void {
    window.history.back();
  }
}
