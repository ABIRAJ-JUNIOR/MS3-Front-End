import { Component } from '@angular/core';
import { CourseService } from '../../../Service/API/Course/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { FooterComponent } from '../../common_components/footer/footer.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, Navebar01Component, FooterComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  CourseName: any;
  constructor(private CourseApiService: CourseService, private routes: ActivatedRoute, private route: Router) {
    this.routes.paramMap.subscribe((params) => {
      this.CourseName = params.get('name');
      console.log(this.CourseName)
      this.SearchCourses();
    });

  }

  Courses: any;

  SearchCourses() {
    this.CourseApiService.SearchCourse(this.CourseName).subscribe({
      next: (response: any) => {
        this.Courses = response
        console.log(this.Courses)
      }, error: (error) => {
        console.log(error.error);
        window.history.back();
      }
    })
  }


  EnrollBtnName: string = "Enroll now"

  changeNameMouseleave($event: MouseEvent) {
    const buttonElement = event?.target as HTMLButtonElement;
    buttonElement.innerText = "Enroll now"
  }
  changeNameEnter($event: MouseEvent) {
    const buttonElement = event?.target as HTMLButtonElement;
    buttonElement.innerText = "Click To Buy"
  }


  ModalProduct: any[] = [];

  viewProduct(product: any) {
    this.ModalProduct = []
    this.ModalProduct.push(product)
  }

  ViewSechduleRouting(courseId: any) {
    this.route.navigate(['/course-sechdule/', courseId])
  }

  ClearModal() {
    this.ModalProduct = []
  }
  getStyles(course: any) {
    let colorClass = '';

    if (course.level === 'Advanced') {
      colorClass = 'bg-success';
    } else if (course.level === 'Beginner') {
      colorClass = 'bg-danger';
    } else if (course.level === 'Intermediate') {
      colorClass = 'bg-primary';
    }

    return colorClass;
  }



}
