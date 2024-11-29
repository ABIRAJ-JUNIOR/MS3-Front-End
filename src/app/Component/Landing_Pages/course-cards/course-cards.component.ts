import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseFilterPipe } from '../../../Pipes/course-filter.pipe';
import { Router, RouterModule } from '@angular/router';
import { PaymentDataService } from '../../../Service/Data/Payment_Data/payment-data.service';
import { CourseService } from '../../../Service/API/Course/course.service';


@Component({
  selector: 'app-course-cards',
  standalone: true,
  imports: [CommonModule,FormsModule,CourseFilterPipe,RouterModule],
  templateUrl: './course-cards.component.html',
  styleUrl: './course-cards.component.css'
})
export class CourseCardsComponent implements OnInit {


  constructor(private CourseService:CourseService,private PaymentService:PaymentDataService , private route:Router){
    
  }

  // courses: any = [
  //   {
  //     "level": "Beginner",
  //     "imageUrl": "/course/card1.jpg",
  //     "CourseName": "Complete Python Bootcamp",
  //     "price": 10000,
  //     "description": "This course is designed for beginners who want to learn Python from scratch. You'll start with basic syntax and progress to more advanced concepts like object-oriented programming, web scraping, and data analysis.",
  //     "rating": 4,
  //     "schedules": [
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "Sun Mar 10 2024",
  //         "Duration": 3,
  //         "Time": "10:00 AM - 12:00 PM",
  //         "Location": "Room 101, Main Campus",
  //         "MaxStudents": 30
  //       },
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "Sun Mar 10 2024",
  //         "Duration": 3,
  //         "Time": "2:00 PM - 4:00 PM",
  //         "Location": "Online",
  //         "MaxStudents": 50
  //       }
  //     ]
  //   },
  //   {
  //     "level": "Beginner",
  //     "imageUrl": "/course/card1.jpg",
  //     "CourseName": "Complete Python Bootcamp",
  //     "price": 10000,
  //     "description": "This course is designed for beginners who want to learn Python from scratch. You'll start with basic syntax and progress to more advanced concepts like object-oriented programming, web scraping, and data analysis.",
  //     "rating": 4,
  //     "schedules": [
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "Sun Mar 10 2024",
  //         "Duration": 3,
  //         "Time": "10:00 AM - 12:00 PM",
  //         "Location": "Room 101, Main Campus",
  //         "MaxStudents": 30
  //       },
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "Sun Mar 10 2024",
  //         "Duration": 3,
  //         "Time": "2:00 PM - 4:00 PM",
  //         "Location": "Online",
  //         "MaxStudents": 50
  //       }
  //     ]
  //   },
  //   {
  //     "level": "Beginner",
  //     "imageUrl": "/course/card1.jpg",
  //     "CourseName": "Complete Python Bootcamp",
  //     "price": 10000,
  //     "description": "This course is designed for beginners who want to learn Python from scratch. You'll start with basic syntax and progress to more advanced concepts like object-oriented programming, web scraping, and data analysis.",
  //     "rating": 4,
  //     "schedules": [
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "Sun Mar 10 2024",
  //         "Duration": 3,
  //         "Time": "10:00 AM - 12:00 PM",
  //         "Location": "Room 101, Main Campus",
  //         "MaxStudents": 30
  //       },
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "Sun Mar 10 2024",
  //         "Duration": 3,
  //         "Time": "2:00 PM - 4:00 PM",
  //         "Location": "Online",
  //         "MaxStudents": 50
  //       }
  //     ]
  //   },
  //   {
  //     "level": "Beginner",
  //     "imageUrl": "/course/card2.jpg",
  //     "CourseName": "Introduction to JavaScript",
  //     "price": 7500,
  //     "description": "A beginner-friendly course to introduce you to JavaScript. You'll learn how to write interactive scripts for web pages, including variables, loops, functions, and event handling.",
  //     "rating": 2,
  //     "schedules": [
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "Sun Mar 10 2024",
  //         "Duration": 3,
  //         "Time": "1:00 PM - 3:00 PM",
  //         "Location": "Room 202, Main Campus",
  //         "MaxStudents": 25
  //       }
  //     ]
  //   },
  //   {
  //     "level": "Intermediate",
  //     "imageUrl": "/course/card3.jpg",
  //     "CourseName": "Advanced Python Programming",
  //     "price": 15000,
  //     "description": "This course dives into more advanced topics like decorators, generators, multi-threading, and Python libraries for machine learning and data science.",
  //     "rating": 3,
  //     "schedules": [
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "Sun Mar 10 2024",
  //         "Duration": 3,
  //         "Time": "9:00 AM - 11:00 AM",
  //         "Location": "Room 303, Tech Building",
  //         "MaxStudents": 20
  //       }
  //     ]
  //   },
  //   {
  //     "level": "Intermediate",
  //     "imageUrl": "/course/card4.jpg",
  //     "CourseName": "Angular for Beginners to Advanced",
  //     "price": 12000,
  //     "description": "Learn Angular from scratch and build dynamic web applications. This course covers everything from basic concepts like components to more advanced topics like RxJS and state management.",
  //     "rating": 1,
  //     "schedules": [
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "Sun Mar 10 2024",
  //         "Duration": 2,
  //         "Time": "3:00 PM - 5:00 PM",
  //         "Location": "Room 404, Coding Lab",
  //         "MaxStudents": 35
  //       },
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "Sun Mar 10 2024",
  //         "Duration": 2,
  //         "Time": "6:00 PM - 8:00 PM",
  //         "Location": "Online",
  //         "MaxStudents": 50
  //       }
  //     ]
  //   },
  //   {
  //     "level": "Advanced",
  //     "imageUrl": "/course/card5.jpg",
  //     "CourseName": "Mastering Machine Learning",
  //     "price": 20000,
  //     "description": "This advanced course covers machine learning models using Python, including regression, classification, clustering, and deep learning.",
  //     "rating": 4,
  //     "schedules": [
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "Sun Mar 10 2024",
  //         "Duration": 3,
  //         "Time": "10:00 AM - 1:00 PM",
  //         "Location": "Room 505, AI Center",
  //         "MaxStudents": 15
  //       }
  //     ]
  //   },
  //   {
  //     "level": "Advanced",
  //     "imageUrl": "/course/courseHeader1.jpg",
  //     "CourseName": "Full Stack Web Development",
  //     "price": 25000,
  //     "description": "Master front-end and back-end web development with technologies like HTML, CSS, JavaScript, Node.js, and MongoDB.",
  //     "rating": 3,
  //     "schedules": [
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "new Date(2024, 8, 10)",
  //         "Duration": 5,
  //         "Time": "8:00 AM - 10:00 AM",
  //         "Location": "Room 606, Web Dev Lab",
  //         "MaxStudents": 40
  //       },
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "new Date(2024, 8, 10)",
  //         "Duration": 5,
  //         "Time": "8:00 AM - 10:00 AM",
  //         "Location": "Room 606, Web Dev Lab",
  //         "MaxStudents": 40
  //       },
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "new Date(2024, 8, 10)",
  //         "Duration": 5,
  //         "Time": "8:00 AM - 10:00 AM",
  //         "Location": "Room 606, Web Dev Lab",
  //         "MaxStudents": 40
  //       },
  //       {
  //         "StartDate": "Sun Mar 10 2024",
  //         "EndDate": "new Date(2024, 8, 10)",
  //         "Duration": 5,
  //         "Time": "8:00 AM - 10:00 AM",
  //         "Location": "Room 606, Web Dev Lab",
  //         "MaxStudents": 40
  //       }
  //     ]
  //   },
  //   {
  //     "level": "Beginner",
  //     "imageUrl": "/course/card4.jpg",
  //     "CourseName": "Data Science with Python",
  //     "price": 12000,
  //     "description": "Learn to analyze data using Python's powerful libraries like pandas and NumPy. This course includes data wrangling, visualization, and building models.",
  //     "rating": 3,
  //     "schedules": [
  //       {
  //         "StartDate": "Mon Mar 11 2024",
  //         "EndDate": "Mon Mar 11 2024",
  //         "Duration": 3,
  //         "Time": "9:00 AM - 11:00 AM",
  //         "Location": "Room 307, Data Science Lab",
  //         "MaxStudents": 30
  //       }
  //     ]
  //   },
  //   {
  //     "level": "Beginner",
  //     "imageUrl": "/course/card1.jpg",
  //     "CourseName": "Web Development Bootcamp",
  //     "price": 13000,
  //     "description": "Learn web development by building real-world projects using HTML, CSS, JavaScript, and frameworks like Bootstrap.",
  //     "rating": 4,
  //     "schedules": [
  //       {
  //         "StartDate": "Mon Mar 12 2024",
  //         "EndDate": "Mon Mar 12 2024",
  //         "Duration": 3,
  //         "Time": "1:00 PM - 3:00 PM",
  //         "Location": "Room 204, Dev Lab",
  //         "MaxStudents": 25
  //       }
  //     ]
  //   },
  //   {
  //     "level": "Intermediate",
  //     "imageUrl": "/course/card3.jpg",
  //     "CourseName": "Deep Learning with TensorFlow",
  //     "price": 15000,
  //     "description": "Dive deep into neural networks, CNNs, and RNNs. Learn to build AI models with TensorFlow and Keras, applied to image and text data.",
  //     "rating": 5,
  //     "schedules": [
  //       {
  //         "StartDate": "Tue Mar 13 2024",
  //         "EndDate": "Tue Mar 13 2024",
  //         "Duration": 4,
  //         "Time": "3:00 PM - 5:00 PM",
  //         "Location": "Room 402, AI Lab",
  //         "MaxStudents": 30
  //       }
  //     ]
  //   },
  //   {
  //     "level": "Advanced",
  //     "imageUrl": "/course/card5.jpg",
  //     "CourseName": "Cloud Computing with AWS",
  //     "price": 20000,
  //     "description": "Learn to design and deploy scalable applications on AWS. Explore services like EC2, S3, Lambda, and more.",
  //     "rating": 3,
  //     "schedules": [
  //       {
  //         "StartDate": "Wed Mar 14 2024",
  //         "EndDate": "Wed Mar 14 2024",
  //         "Duration": 5,
  //         "Time": "9:00 AM - 11:00 AM",
  //         "Location": "Room 505, Cloud Lab",
  //         "MaxStudents": 25
  //       }
  //     ]
  //   },
  //   {
  //     "level": "Advanced",
  //     "imageUrl": "/course/card2.jpg",
  //     "CourseName": "Blockchain Development",
  //     "price": 22000,
  //     "description": "Learn the fundamentals of blockchain technology and smart contract development. Apply your knowledge by building decentralized applications (dApps).",
  //     "rating": 4,
  //     "schedules": [
  //       {
  //         "StartDate": "Fri Mar 15 2024",
  //         "EndDate": "Fri Mar 15 2024",
  //         "Duration": 3,
  //         "Time": "11:00 AM - 1:00 PM",
  //         "Location": "Room 606, Blockchain Lab",
  //         "MaxStudents": 20
  //       }
  //     ]
  //   },
  //   {
  //     "level": "Intermediate",
  //     "imageUrl": "/course/courseHeader1.jpg",
  //     "CourseName": "Digital Marketing",
  //     "price": 18000,
  //     "description": "This course will teach you strategies for SEO, SEM, content marketing, social media advertising, and more. Become a certified digital marketer.",
  //     "rating": 5,
  //     "schedules": [
  //       {
  //         "StartDate": "Sat Mar 16 2024",
  //         "EndDate": "Sat Mar 16 2024",
  //         "Duration": 4,
  //         "Time": "1:00 PM - 3:00 PM",
  //         "Location": "Room 301, Marketing Lab",
  //         "MaxStudents": 30
  //       }
  //     ]
  //   },
  // ];

  ModalProduct: any[] = [];

  viewProduct(product: any) {
    this.ModalProduct = []
    this.ModalProduct.push(product)
   console.log(this.ModalProduct)
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

  pageSize: number = 6; // Courses per page
  currentPage: number = 1; // Current page index
  totalPages: number = 0; // Total number of pages
  pageNumbers: number[] = []; // Array of page numbers to display
  paginatedCourses: any[] = [];

  ngOnInit() {
    this.paginateCourses()
  }

  paginateCourses() {
    this.CourseService.pagination(this.currentPage,this.pageSize).subscribe({
      next:((courses:any)=>{
        this.paginatedCourses=courses.items
        console.log(this.paginatedCourses)
        this.totalPages=courses.totalPages
        this.pageSize=courses.pageSize
        this.currentPage=courses.currentPage
        console.log(this.paginatedCourses)
      })
    })
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateCourses();
    }
  }


  isFilterVisible: boolean = false;

  filterlevel: string="";
  filterPrice: string="";

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
    this.filterlevel="";
    this.filterPrice=""

  }


  applyFilter() {
    let level=document.getElementById('CourseLevel') as HTMLInputElement
    let price=document.getElementById('Price') as HTMLInputElement
    this.filterlevel=level.value
    this.filterPrice=price.value
    this.paginateCourses()
  }

  PaymentCourse:any[]=[]

  sendPaymentData(sechdule:any) {
    let PurchaseDetails={
      "courseName":this.ModalProduct[0].courseName,
      "courseFee":this.ModalProduct[0].courseFee,
      "courseId":this.ModalProduct[0].id,
      ...sechdule
    }
    this.PaymentCourse.push(PurchaseDetails)
   
  }
  ConfirmationPayment(){
    this.PaymentService.PurchaseDetailsSetLocal(this.PaymentCourse[0]);
  }
 
  CancelPurchase(){
    this.PaymentCourse = []
  }
}
