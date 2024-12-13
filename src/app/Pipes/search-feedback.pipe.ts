import { Pipe, PipeTransform } from '@angular/core';
import { FeedBack } from '../Modals/modals';

@Pipe({
  name: 'searchFeedback',
  standalone: true
})
export class SearchFeedbackPipe implements PipeTransform {

  transform(feedbacks: FeedBack[], ...args: string[]): FeedBack[] {
    let searchTest:string = args[0]
    if(searchTest == '') return feedbacks
    return feedbacks.filter(f => f.courseId.includes(searchTest))
  }

}
