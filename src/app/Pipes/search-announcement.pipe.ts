import { Pipe, PipeTransform } from '@angular/core';
import { Announcement } from '../Modals/modals';

@Pipe({
  name: 'searchAnnouncement',
  standalone: true
})
export class SearchAnnouncementPipe implements PipeTransform {

  transform(announcements: Announcement[], ...args: string[]): Announcement[] {
    let searchTest:string = args[0];
    return announcements.filter(a => a.audienceType.toLowerCase() == searchTest.toLowerCase() || a.title.toLowerCase().includes(searchTest.toLowerCase()));
  }

}
