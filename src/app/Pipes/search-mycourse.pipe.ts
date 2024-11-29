import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMycourse',
  standalone: true
})
export class SearchMycoursePipe implements PipeTransform {

  transform(value: any[], SearchCourse?: string): any {

    if (!SearchCourse) {
      return value;
    }
    console.log(SearchCourse)

    value.filter((n: any) => {
      return n.courseScheduleResponse?.courseResponse?.courseName.toLowerCase().includes(SearchCourse?.toLowerCase());
    })
  }

}
