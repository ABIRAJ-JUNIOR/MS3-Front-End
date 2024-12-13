import { Pipe, PipeTransform } from '@angular/core';
import { Notification } from '../Modals/modals';

@Pipe({
  name: 'searchNotification',
  standalone: true
})
export class SearchNotificationPipe implements PipeTransform {

  transform(notification: Notification[], ...args: string[]): Notification[] {
    let searchTest:string = args[0]
    return notification.filter(n => n.notificationType.toLowerCase().includes(searchTest.toLowerCase()))
  }

}
