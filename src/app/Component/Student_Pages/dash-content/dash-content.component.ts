import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../../Modals/modals';
import { StudentService } from '../../../Service/API/Student/student.service';
import { StudentDashDataService } from '../../../Service/Data/Student_Data/student-dash-data.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CourseService } from '../../../Service/API/Course/course.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FeedbackServiceService } from '../../../Service/API/Feedback/feedback-service.service';
import { ToastrService } from 'ngx-toastr';
import { EnrollmentService } from '../../../Service/API/Enrollment/enrollment.service';

@Component({
  selector: 'app-dash-content',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, ReactiveFormsModule],
  templateUrl: './dash-content.component.html',
  styleUrl: './dash-content.component.css',
})
export class DashContentComponent implements OnInit {
  StudentDetails: any;
  StudentTokenDetails: any;
  TotalPayments: number = 0;
  TotalAssignments: number = 0;
  totalCourse: number = 0;
  feedBackForm: FormGroup;

  PendingPayments: number = 0;
  paidPayments: number = 0;
  TotalPayment: number = 0;
  EnrolledCourses: number = 0;
  PaymentData: any[] = [];
  gradient: boolean = false;
  animations: boolean = true;
  courseData: any[] = [];

  constructor(
    private StudentDashDataService: StudentDashDataService,
    private StudentApiService: StudentService,
    private router: Router,
    private CourseService: CourseService,
    private fb: FormBuilder,
    private feedbackService: FeedbackServiceService,
    private tostr: ToastrService,
    private EnrollmentService: EnrollmentService
  ) {
    this.feedBackForm = this.fb.group({
      courseId: ['', Validators.required],
      rating: ['', Validators.required],
      feedBackText: ['', Validators.required],
      studentId: [''],
    });
  }

  ngOnInit(): void {
    this.StudentTokenDetails =
      this.StudentDashDataService.GetStudentDeatilByLocalStorage();
    this.enrollmentServiceLoad();
    this.feedBackLoad();
  }

  Enrollments: any;

  enrollmentServiceLoad() {
    this.EnrollmentService.getAllEnrollmentsByStudentId(
      this.StudentTokenDetails.Id
    ).subscribe({
      next: (response) => {
        this.Enrollments = response;
        console.log(this.Enrollments);
      },
      error: () => {},
      complete: () => {
        this.totalPaymentCalculate();

        this.studentServiceLoad();
      },
    });
  }

  studentServiceLoad() {
    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe({
      next: (StudentResponse: Student) => {
        this.StudentDetails = StudentResponse;
      },
      error: (error) => {
        this.tostr.error(error.message);
      },
      complete: () => {
        this.courseServiceLoad();
      },
    });
  }
  courseServiceLoad() {
    this.CourseService.getCourses().subscribe({
      next: (CourseResponse: any) => {
        this.totalCourse = CourseResponse.length;
      },
      error: (error) => {
        this.tostr.error(error.message);
      },
      complete: () => {
        this.ChartCalculation();
      },
    });
  }

  totalPaymentCalculate(): void {
    if (this.Enrollments != null) {
      for (let i = 0; i < this.Enrollments.length; i++) {
        const element = this.Enrollments[i].paymentResponse;
        this.TotalAssignments +=
          this.Enrollments[
            i
          ].courseScheduleResponse.courseResponse.assessmentResponse.length;
        for (let p = 0; p < element.length; p++) {
          this.TotalPayments += Number(element[p].amountPaid);
        }
      }
    }
  }

  ChartCalculation(): void {
    if (this.StudentDetails) {
      for (let i = 0; i < this.Enrollments.length; i++) {
        const element = this.Enrollments[i].paymentResponse;
        if (this.Enrollments[i].paymentStatus === 'InProcess') {
          this.PendingPayments++;
          for (
            let installment = 0;
            installment < element.length;
            installment++
          ) {
            this.TotalPayment++;
          }
        } else if (this.Enrollments[i].paymentStatus === 'Paid') {
          this.paidPayments++;
        }
      }

      this.PaymentData = [
        { name: 'Completed', value: this.paidPayments },
        { name: 'Pending', value: this.PendingPayments },
        { name: 'TotalPayments', value: this.TotalPayment },
      ];
    }

    this.createCourseChart();
  }

  createCourseChart(): void {
    if (this.StudentDetails) {
      this.courseData = [
        { name: 'Assignments', value: this.TotalAssignments },
        { name: 'Enrolled Course', value: this.Enrollments.length },
        { name: 'TotalCourses', value: this.totalCourse },
      ];
    }
  }

  onSubmit(): void {
    if (this.feedBackForm.valid) {
      this.feedBackForm.get('studentId')?.setValue(this.StudentTokenDetails.Id);
      this.feedbackService.SendFeedback(this.feedBackForm.value).subscribe({
        next: () => {
          this.tostr.success('Feedback Send Successfully');
          this.feedBackForm.reset();
          this.feedBackLoad();
        },
        error: () => {
          this.tostr.error('Feedback Send Failed');
          this.feedBackForm.reset();
        },
      });
    }
  }

  feedbacks: any;

  feedBackLoad() {
    this.feedbackService
      .getFeedbackByStudentId(this.StudentTokenDetails.Id)
      .subscribe({
        next: (response: any) => {
          this.feedbacks = response;
          console.log(this.feedbacks);
        },
        error: () => {
          console.log('Failed to load feedbacks');
        },
      });
  }
}
