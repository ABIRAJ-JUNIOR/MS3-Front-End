import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../Service/API/Course/course.service';
import { FormsModule } from '@angular/forms';
import { CourseFilterPipe } from '../../../Pipes/course-filter.pipe';
import { PaymentDataService } from '../../../Service/Data/Payment_Data/payment-data.service';
import { Router, RouterModule } from '@angular/router';
import { Course } from '../../../Modals/modals';

@Component({
  selector: 'app-course-cards',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseFilterPipe, RouterModule],
  templateUrl: './course-cards.component.html',
  styleUrl: './course-cards.component.css'
})
export class CourseCardsComponent implements OnInit {


  constructor(
    private courseService: CourseService,
    private paymentService: PaymentDataService,
    private route: Router
  ) { }


  ModalProduct: any[] = [];

  viewProduct(product: any) {
    this.ModalProduct = []
    this.ModalProduct.push(product)
  }

  ViewSechduleRouting(courseId: any) {
    this.route.navigate(['/course-sechdule/', courseId])
  }

  ClearModal() {
    this.ModalProduct = []
  }

  // Btn Change Name Event Function

  EnrollBtnName: string = "Enroll now"

  changeNameMouseleave($event: MouseEvent) {
    const buttonElement = event?.target as HTMLButtonElement;
    buttonElement.innerText = "Enroll now"
  }
  changeNameEnter($event: MouseEvent) {
    const buttonElement = event?.target as HTMLButtonElement;
    buttonElement.innerText = "Click To Buy"
  }

  //pagination Courses

  pageSize: number = 6;
  currentPage: number = 1;
  totalPages: number = 0;
  pageNumbers: number[] = [];
  paginatedCourses: any[] = [];

  ngOnInit() {
    this.paginateCourses();
    this.getCourseCategories();

  }

  paginateCourses() {

    this.courseService.pagination(this.currentPage, this.pageSize).subscribe({
      next: ((courses: any) => {
        this.paginatedCourses = courses.items
        this.totalPages = courses.totalPages
        this.pageSize = courses.pageSize
        this.currentPage = courses.currentPage

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

  filterlevel: string = "";
  filterPrice: string = "";
  filterCategory: string = "";

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
    this.filterlevel = "";
    this.filterPrice = ""
    this.filterCategory = ""

  }


  applyFilter() {
    let level = document.getElementById('CourseLevel') as HTMLInputElement
    let price = document.getElementById('Price') as HTMLInputElement
    let CategoryFilter = document.getElementById('CategoryFilter') as HTMLInputElement
    this.filterlevel = level.value
    this.filterPrice = price.value
    this.filterCategory = CategoryFilter.value
    this.paginateCourses();
  }

  PaymentCourse: any[] = []

  sendPaymentData(sechdule: any) {
    let PurchaseDetails = {
      "courseName": this.ModalProduct[0].courseName,
      "courseFee": this.ModalProduct[0].courseFee,
      "courseId": this.ModalProduct[0].id,
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


  categories: any;
  getCourseCategories() {
    this.courseService.GetAllCategory().subscribe({
      next: (response: any) => {
        this.categories = response
      }
    })
  }


  getStyles(course: any) {
    let colorClass = '';

    if (course.level === 'Advanced') {
      colorClass = 'bg-danger'; 
    } else if (course.level === 'Beginner') {
      colorClass = 'bg-primary'; 
    } else if (course.level === 'Intermediate') {
      colorClass = 'bg-success'; 
    }

    return colorClass;
  }



}
