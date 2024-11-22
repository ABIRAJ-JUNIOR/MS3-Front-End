import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseFilter',
  standalone: true
})
export class CourseFilterPipe implements PipeTransform {

  transform(Courses: any[], level?:string , price?:string): any[] {

    if (!Courses) return [];
    if (level) {
      Courses=Courses.find(x=>x.level == level )
    }
    if(price){
      Courses = Courses.filter(item => {
        const priceRange = item.price;
        if (price === '0') {
          return priceRange >= 10000 && priceRange <= 30000;
        } else if (price === '1') {
          return priceRange >= 30000 && priceRange <= 50000;
        } else if (price === '2') {
          return priceRange >= 50000 && priceRange <= 80000;
        } else if (price === '3') {
          return priceRange >= 80000 && priceRange <= 100000;
        }
        return true;
      });
    }

    return Courses;
   
  }

}
