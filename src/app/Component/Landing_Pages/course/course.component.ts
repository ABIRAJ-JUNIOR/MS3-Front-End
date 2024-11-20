import { Component } from '@angular/core';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [Navebar01Component, FooterComponent, RouterModule, CommonModule ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {



  courses: any = [
    {
      "level": "Beginner",
      "imagePath": "/course/card1.jpg",
      "CourseName": "Complete Python Bootcamp",
      "price": 10000,
      "description": "This course is designed for beginners who want to learn Python from scratch. You'll start with basic syntax and progress to more advanced concepts like object-oriented programming, web scraping, and data analysis. It is ideal for those looking to build a strong foundation in Python.",
      "rating": 4,
      "schedules": [
        {
          "StartDate":"Sun Mar 10 2024",
          "EndDate": "Sun Mar 10 2024", 
          "Duration": 3,
          "Time": "10:00 AM - 12:00 PM",
          "Location": "Room 101, Main Campus",
          "MaxStudents": 30
        },
        {
          "StartDate": "Sun Mar 10 2024",
          "EndDate":"Sun Mar 10 2024", 
          "Duration": 3,
          "Time": "2:00 PM - 4:00 PM",
          "Location": "Online",
          "MaxStudents": 50
        }
      ]
    },
    {
      "level": "Beginner",
      "imagePath": "/course/card2.jpg",
      "CourseName": "Introduction to JavaScript",
      "price": 7500,
      "description": "A beginner-friendly course to introduce you to JavaScript. You'll learn how to write interactive scripts for web pages, including variables, loops, functions, and event handling. This course is perfect for those starting with web development.",
      "rating": 2,
      "schedules": [
        {
          "StartDate": "Sun Mar 10 2024",
          "EndDate": "Sun Mar 10 2024",
          "Duration": 3,
          "Time": "1:00 PM - 3:00 PM",
          "Location": "Room 202, Main Campus",
          "MaxStudents": 25
        }
      ]
    },
    {
      "level": "Intermediate",
      "imagePath": "/course/card3.jpg",
      "CourseName": "Advanced Python Programming",
      "price": 15000,
      "description": "For those who already have a basic understanding of Python, this course dives into more advanced topics like decorators, generators, multi-threading, and Python libraries for machine learning and data science. Perfect for Python developers looking to expand their skillset.",
      "rating": 3,
      "schedules": [
        {
          "StartDate":"Sun Mar 10 2024",
          "EndDate": "Sun Mar 10 2024",
          "Duration": 3,
          "Time": "9:00 AM - 11:00 AM",
          "Location": "Room 303, Tech Building",
          "MaxStudents": 20
        }
      ]
    },
    {
      "level": "Intermediate",
      "imagePath": "/course/card4.jpg",
      "CourseName": "Angular for Beginners to Advanced",
      "price": 12000,
      "description": "Learn Angular from scratch and build dynamic web applications. This course covers everything from basic concepts like components, directives, and services to more advanced topics like RxJS, state management, and testing. Ideal for developers looking to master Angular for front-end development.",
      "rating": 1,
      "schedules": [
        {
          "StartDate": "Sun Mar 10 2024",
          "EndDate": "Sun Mar 10 2024",
          "Duration": 2,
          "Time": "3:00 PM - 5:00 PM",
          "Location": "Room 404, Coding Lab",
          "MaxStudents": 35
        },
        {
          "StartDate": "Sun Mar 10 2024",
          "EndDate": "Sun Mar 10 2024",
          "Duration": 2,
          "Time": "6:00 PM - 8:00 PM",
          "Location": "Online",
          "MaxStudents": 50
        }
      ]
    },
    {
      "level": "Advanced",
      "imagePath": "/course/card5.jpg",
      "CourseName": "Mastering Machine Learning",
      "price": 20000,
      "description": "This advanced course teaches you how to develop and deploy machine learning models using Python. You'll explore algorithms like regression, classification, clustering, and deep learning, and apply them to real-world projects. Great for professionals aiming to specialize in AI and ML.",
      "rating": 4,
      "schedules": [
        {
          "StartDate": "Sun Mar 10 2024",
          "EndDate": "Sun Mar 10 2024",
          "Duration": 3,
          "Time": "10:00 AM - 1:00 PM",
          "Location": "Room 505, AI Center",
          "MaxStudents": 15
        }
      ]
    },
    {
      "level": "Advanced",
      "imagePath": "/course/courseHeader1.jpg",
      "CourseName": "Full Stack Web Development",
      "price": 25000,
      "description": "Master both front-end and back-end web development with this comprehensive course. You'll learn HTML, CSS, JavaScript, as well as server-side technologies like Node.js and databases like MongoDB. This course is for developers who want to become proficient in building complete web applications.",
      "rating": 3,
      "schedules": [
        {
          "StartDate": "Sun Mar 10 2024",
          "EndDate": "new Date(2024, 8, 10)",
          "Duration": 5,
          "Time": "8:00 AM - 10:00 AM",
          "Location": "Room 606, Web Dev Lab",
          "MaxStudents": 40
        },
        {
          "StartDate": "Sun Mar 10 2024",
          "EndDate": "new Date(2024, 8, 10)",
          "Duration": 5,
          "Time": "8:00 AM - 10:00 AM",
          "Location": "Room 606, Web Dev Lab",
          "MaxStudents": 40
        },
        {
          "StartDate": "Sun Mar 10 2024",
          "EndDate": "new Date(2024, 8, 10)",
          "Duration": 5,
          "Time": "8:00 AM - 10:00 AM",
          "Location": "Room 606, Web Dev Lab",
          "MaxStudents": 40
        },
        {
          "StartDate": "Sun Mar 10 2024",
          "EndDate": "new Date(2024, 8, 10)",
          "Duration": 5,
          "Time": "8:00 AM - 10:00 AM",
          "Location": "Room 606, Web Dev Lab",
          "MaxStudents": 40
        }
      ]
    }
  ];
  

  ModalProduct: any[] = [];

  viewProduct(product: any) {
    this.ModalProduct = []
    this.ModalProduct.push(product)

  }
  ClearModal() {
    this.ModalProduct = []
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



}
