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

    return value.filter((n: any) => {
      const courseName = n.courseScheduleResponse?.courseResponse?.courseName?.toLowerCase();
      return courseName && courseName.includes(SearchCourse?.toLowerCase());
    });
  }

}
