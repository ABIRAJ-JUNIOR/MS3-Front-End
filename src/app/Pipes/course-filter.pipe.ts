import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseFilter',
  standalone: true
})
export class CourseFilterPipe implements PipeTransform {

  transform(Courses: any[], level?: string, price?: string, categoryId?: string): any[] {

    if (!Courses) return [];
    if (level) {
      if (level === '0') {
        Courses = Courses.filter(x => x.level.toLowerCase() === "beginner");
      } else if (level === '1') {
        Courses = Courses.filter(x => x.level.toLowerCase() === "intermediate");
      } else if (level === '2') {
        Courses = Courses.filter(x => x.level.toLowerCase() === "advanced");
      }
    }

    if (price) {
      Courses = Courses.filter(item => {
        const priceRange = item.courseFee;
        if (price === '0') {
          return priceRange >= 100 && priceRange <= 500;
        } else if (price === '1') {
          return priceRange >= 500 && priceRange <= 1000;
        } else if (price === '2') {
          return priceRange >= 1000 && priceRange <= 1500;
        } else if (price === '3') {
          return priceRange >= 1500 && priceRange <= 2000;
        }
        return true;
      });
    }
    if (categoryId) {
      Courses = Courses.filter(item => {
        return item.courseCategoryId === categoryId
      })
      
    }

    return Courses;

  }

}
