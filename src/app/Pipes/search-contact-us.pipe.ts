import { Pipe, PipeTransform } from '@angular/core';
import { ContactUs } from '../Modals/modals';

@Pipe({
  name: 'searchContactUs',
  standalone: true
})
export class SearchContactUsPipe implements PipeTransform {

  transform(contactMessages: ContactUs[], ...args: string[]):ContactUs[] {
    let searchTest:string = args[0]
    if(searchTest == "true"){
      console.log("Helllo")
      return contactMessages.filter(m =>  m.isRead == true)
    }else if(searchTest == "false"){
      return contactMessages.filter(m =>  m.isRead == false)
    }else{
      return contactMessages
    }
  }
}
