import { Component } from '@angular/core';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService } from '../../../Service/API/Course/course.service';
import { Course } from '../../../Modals/modals';
import { CommonModule } from '@angular/common';
import { PaymentDataService } from '../../../Service/Data/Payment_Data/payment-data.service';
import { TopinfoComponent } from "../../common_components/topinfo/topinfo.component";

@Component({
  selector: 'app-course-sechdules',
  standalone: true,
  imports: [TopinfoComponent, FooterComponent, CommonModule, TopinfoComponent , RouterModule],
  templateUrl: './course-sechdules.component.html',
  styleUrl: './course-sechdules.component.css'
})
export class CourseSechdulesComponent {

  constructor(private route: ActivatedRoute,
    private courseService: CourseService,
    private paymentService: PaymentDataService,
    private router:Router
  ) { }

  courseId: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('courseId');
      this.courseGetById()
    });
    this.getAllCourses();
    window.scrollTo(0, 0);
  }

  courses: any;

  courseGetById() {
    this.courseService.getCourseByID(this.courseId).subscribe({
      next: (response: Course) => {
        this.courses = response
        console.log(this.courses)
      }, error: () => {
        window.history.back()
      }, complete: () => {
        this.calculateAverageRating()
      }
    })
  }

  topCourses: any;

  getAllCourses() {
    this.courseService.getTop3Courses().subscribe({
      next: (response: Course[]) => {
        this.topCourses = response;
      },
      error: (err) => {
        console.error('Failed to fetch ', err);
      },
      complete: () => {
        console.log('Fetched top 3 courses successfully.');
      }
    });
  }


  CourseRating: number = 0;


  calculateAverageRating() {
    if (this.courses.feedbacks) {
      let Stars = 0;
      this.courses.feedbacks.forEach((feedback: any) => {
        Stars += feedback.rating;
      });
      this.CourseRating = Stars / this.courses.feedbacks.length;
    } else {
      this.CourseRating = 0;
    }
  }

  PaymentCourse: any[] = []

  sendPaymentData(sechdule: any) {
    let PurchaseDetails = {
      "courseName": this.courses.courseName,
      "courseFee": this.courses.courseFee,
      "courseId": this.courses.id,
      ...sechdule,
      "PaymentCheck": true
    }
    this.PaymentCourse.push(PurchaseDetails)


  }

  ConfirmationPayment() {
    this.paymentService.PurchaseDetailsSetLocal(this.PaymentCourse[0]);
  }

  CancelPurchase() {
    this.PaymentCourse = []
  }

  ViewCourseSechdules(id:any){
  this.router.navigate(['/course-sechdule/' + id])
  
  }



}
