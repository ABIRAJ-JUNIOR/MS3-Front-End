import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseFilter',
  standalone: true
})
export class CourseFilterPipe implements PipeTransform {

  transform(Courses: any[], level?: string, price?: string, categoryId?: string): any[] {
    if (!Courses) return [];

  
    if (categoryId) {
      Courses = Courses.filter(item => item.courseCategoryId === categoryId);
    }

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
          return priceRange >= 10000 && priceRange <= 20000;
        } else if (price === '1') {
          return priceRange >= 20000 && priceRange <= 30000;
        } else if (price === '2') {
          return priceRange >= 30000 && priceRange <= 40000;
        } else if (price === '3') {
          return priceRange >= 40000 && priceRange <= 50000;
        }
        return true;
      });
    }


    return Courses;

  }

}
