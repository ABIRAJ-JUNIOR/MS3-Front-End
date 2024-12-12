import { Component } from '@angular/core';
import { CourseService } from '../../../Service/API/Course/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

CourseName:any;
  constructor(private CourseApiService:CourseService,private routes:ActivatedRoute) {
    this.routes.paramMap.subscribe((params) => {
      this.CourseName = params.get('Name');
      console.log(this.CourseName)
    });
  
  }

Courses:any;

SearchCourses(){
  this.CourseApiService.
}

}
