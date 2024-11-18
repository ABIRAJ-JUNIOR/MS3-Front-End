import { Component } from '@angular/core';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [Navebar01Component,FooterComponent,RouterModule,CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {


   courses:any=[
    {
      "level": "Beginner",
      "imagePath": "/course/card1.jpg",
      "title": "Complete Python Bootcamp",
      "price": 10000,
      "description": "Rs10000"
    },
    {
      "level": "Beginner",
      "imagePath": "/course/card2.jpg",
      "title": "Introduction to JavaScript",
      "price": 7500,
      "description": "Rs7500"
    },
    {
      "level": "Intermediate",
      "imagePath": "/course/card3.jpg",
      "title": "Advanced Python Programming",
      "price": 15000,
      "description": "Rs15000"
    },
    {
      "level": "Intermediate",
      "imagePath": "/course/card4.jpg",
      "title": "Angular for Beginners to Advanced",
      "price": 12000,
      "description": "Rs12000"
    },
    {
      "level": "Advanced",
      "imagePath": "/course/card5.jpg",
      "title": "Mastering Machine Learning",
      "price": 20000,
      "description": "Rs20000"
    },
    {
      "level": "Advanced",
      "imagePath": "/course/courseHeader1.jpg",
      "title": "Full Stack Web Development",
      "price": 25000,
      "description": "Rs25000"
    }
  ]
  
}
