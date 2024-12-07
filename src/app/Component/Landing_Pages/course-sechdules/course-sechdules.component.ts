import { Component } from '@angular/core';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../Service/API/Course/course.service';
import { Course } from '../../../Modals/modals';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-sechdules',
  standalone: true,
  imports: [Navebar01Component, FooterComponent , CommonModule],
  templateUrl: './course-sechdules.component.html',
  styleUrl: './course-sechdules.component.css'
})
export class CourseSechdulesComponent {

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  courseId: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('courseId');
      this.courseGetById()
    });
  }

  courses:any;

  courseGetById() {
    this.courseService.getCourseByID(this.courseId).subscribe({
      next: (response: Course) => {
        this.courses = response
        console.log(this.courses)
      }
    })
  }
}
