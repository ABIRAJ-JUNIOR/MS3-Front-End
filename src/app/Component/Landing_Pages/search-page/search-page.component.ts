import { Component } from '@angular/core';
import { CourseService } from '../../../Service/API/Course/course.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

CourseName:any;
  constructor(private CourseApiService:CourseService,private routes:ActivatedRoute) {
    this.routes.paramMap.subscribe((params) => {
      this.CourseName = params.get('name');
      console.log(this.CourseName)
      this.SearchCourses();
    });
  
  }

Courses:any;

SearchCourses(){
  this.CourseApiService.SearchCourse(this.CourseName).subscribe({
    next:(response:any)=>{
      this.Courses=response
      console.log(this.Courses)
    },error:(error)=>{
      console.log(error.error);
      window.history.back();
    }
  })
}

}
