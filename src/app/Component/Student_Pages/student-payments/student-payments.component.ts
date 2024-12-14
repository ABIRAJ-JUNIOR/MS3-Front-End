import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { StudentService } from "../../../Service/API/Student/student.service";
import { PaymentDataService } from "../../../Service/Data/Payment_Data/payment-data.service";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { EnrollmentService } from "../../../Service/API/Enrollment/enrollment.service";


@Component({
  selector: 'app-student-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-payments.component.html',
  styleUrl: './student-payments.component.css'
})
export class StudentPaymentsComponent implements OnInit {
  constructor(private StudentDashDataService: StudentDashDataService,
    private StudentApiService: StudentService,
    private router: Router,
    private PaymentService: PaymentDataService,
    private EnrollmentService: EnrollmentService
  ) {
  }


  payCheck: string = "InProcess"

  Enrollments: any;

  NewEnrollment: any[] = [];
  NewEnrollmentLength: number = 0
  StudentTokenDetails: any;
  NoImage: string = "https://cdn-icons-png.flaticon.com/512/9193/9193906.png"

  ngOnInit(): void {
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();
    this.enrollmentServiceLoad()

  }


  enrollmentServiceLoad() {
    console.log("Your Enrollments id" + this.StudentTokenDetails.Id)

    this.EnrollmentService.getAllEnrollmentsByStudentId(this.StudentTokenDetails.Id).subscribe({
      next: (response) => {
        this.Enrollments = response
        console.log(this.Enrollments[0])
      }, error: () => {

      }, complete: () => {
        this.Enrollments.forEach((element: any) => {
          let amount: number = 0
          element.paymentResponse.forEach((data: any) => {
            amount += Number(data.amountPaid)
          })
          let payment = {
            ...element,
            paidTotal: Number(Math.round(amount * 100) / 100)
          }
          this.NewEnrollment.push(payment)
          console.log(this.NewEnrollment)
        });
      }
    })
  }


 

  calculatePaymentProgress(amountPaid: number, courseFee: number): number {
    return (amountPaid / courseFee) * 100;
  }

  calculateProgressColor(progress: number): string {
    if (progress < 40) {
      return 'bg-danger';
    } else if (progress < 75) {
      return 'bg-warning';
    } else {
      return 'bg-success';
    }
  }

  InstallmentPayment: any;


  payClick(data: any) {

    this.InstallmentPayment = data;
    console.log()
  }

  ConfirmationPayment() {
    let PurchaseDetails = {
      ...this.InstallmentPayment,
      "PaymentCheck": false
    }
    console.log(this.InstallmentPayment)
    if (this.InstallmentPayment.paymentStatus == "InProcess") {
      this.PaymentService.PurchaseDetailsSetLocal(PurchaseDetails);

    } else {
    }
  }
  cancelPayment() {
    this.InstallmentPayment = ""
  }



  @ViewChild('table', { static: false }) table!: ElementRef;

  async downloadTableAsImage() {
    try {
      if (!this.table || !this.table.nativeElement) {
        console.error('Table element not found!');
        return;
      }
  
      const html2canvas = (await import('html2canvas')).default;
  
      const canvas = await html2canvas(this.table.nativeElement, {
        scale: 3, 
        useCORS: true, 
        backgroundColor: '#ffffff', 
      });
  
      const imageData = canvas.toDataURL('image/png');
  
      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'table-image.png'; 
      link.click(); 
    } catch (error) {
      console.error('Error downloading table as image:', error);
    }
  }
  
}
