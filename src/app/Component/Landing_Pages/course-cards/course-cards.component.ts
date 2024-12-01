import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../Service/API/Course/course.service';
import { Course } from '../../../Modals/modals';
import { FormsModule } from '@angular/forms';
import { CourseFilterPipe } from '../../../Pipes/course-filter.pipe';
import { PaymentDataService } from '../../../Service/Data/Payment_Data/payment-data.service';
import { Router, RouterModule } from '@angular/router';

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
        this.totalPages=courses.totalPages
        this.pageSize=courses.pageSize
        this.currentPage=courses.currentPage
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
      ...sechdule,
      "PaymentCheck":true
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
