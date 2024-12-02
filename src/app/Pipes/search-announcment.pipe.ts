import { Pipe, PipeTransform } from '@angular/core';
import { Announcement } from '../Modals/modals';

@Pipe({
  name: 'searchAnnouncment',
  standalone: true
})
export class SearchAnnouncmentPipe implements PipeTransform {

  transform(announcement: Announcement[], ...args: string[]): Announcement[] {
    let searchTest:string = args[0]
    return announcement.filter(a => a.title.toLowerCase().includes(searchTest.toLowerCase()))
  }

}
