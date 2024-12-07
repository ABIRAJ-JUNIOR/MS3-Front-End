import { Component } from '@angular/core';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../Service/API/Course/course.service';
import { Course } from '../../../Modals/modals';
import { CommonModule } from '@angular/common';
import { PaymentDataService } from '../../../Service/Data/Payment_Data/payment-data.service';

@Component({
  selector: 'app-course-sechdules',
  standalone: true,
  imports: [Navebar01Component, FooterComponent, CommonModule],
  templateUrl: './course-sechdules.component.html',
  styleUrl: './course-sechdules.component.css'
})
export class CourseSechdulesComponent {

  constructor(private route: ActivatedRoute,
    private courseService: CourseService,
    private paymentService: PaymentDataService
  ) { }

  courseId: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('courseId');
      this.courseGetById()
    });
  }

  courses: any;

  courseGetById() {
    this.courseService.getCourseByID(this.courseId).subscribe({
      next: (response: Course) => {
        this.courses = response
        console.log(this.courses)
      }
    })
  }

  PaymentCourse: any[] = []

  sendPaymentData(sechdule: any) {
    let PurchaseDetails = {
      "courseName": this.courses[0].courseName,
      "courseFee": this.courses[0].courseFee,
      "courseId": this.courses[0].id,
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




}
