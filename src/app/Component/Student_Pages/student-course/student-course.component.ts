import { Component } from '@angular/core';
import { CourseCardsComponent } from '../../Landing_Pages/course-cards/course-cards.component';

@Component({
  selector: 'app-student-course',
  standalone: true,
  imports: [CourseCardsComponent],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.css'
})
export class StudentCourseComponent {

}
