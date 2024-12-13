import { Component } from '@angular/core';
import { PaymentDataService } from '../../../../Service/Data/Payment_Data/payment-data.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { Location } from '@angular/common';
import { Enrollment } from '../../../../Modals/modals';
import { StudentDashDataService } from '../../../../Service/Data/Student_Data/student-dash-data.service';
import { MailServiceService } from '../../../../Service/API/Mail/mail-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-gate',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment-gate.component.html',
  styleUrl: './payment-gate.component.css'
})
export class PaymentGateComponent {

  recievedModalItems: any[] = []; 

  CardFormData: FormGroup;

  constructor(
    private tostr: ToastrService, 
    private mailService: MailServiceService, 
    private studentDataService: StudentDashDataService, 
    private PaymentDataService: PaymentDataService, 
    private fb: FormBuilder, private router: Router, 
    private location: Location
  ) {
    this.CardFormData = this.fb.group({
      name: ['', [Validators.required]],
      number: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{13,19}$'),
      ],
      ],
      expiration: ['', [Validators.required]],
      cvv: ['', [
        Validators.required,
        Validators.maxLength(3),
        Validators.minLength(3),
        Validators.pattern('^[0-9]{3}$'),
      ],
      ],
    });
  }


  LocalCardDetails: any;

  ngOnInit(): void {
    this.loadItems();
    this.AddCardDetails()
    window.onpopstate = function () {
      history.pushState(null, '', location.href);
    };
    console.log(this.LocalCardDetails)

  }


  DeivdeInstallment: number = 0;

  SecondInstallment: any = ""
  ThirdInstallment: any = ""

  installmentTotal: number = 0
  courseMaterials: string = ""



  PaymentPlans: number = 1;

  loadItems(): void {
    this.recievedModalItems.push(JSON.parse(this.PaymentDataService.PurchaseDetailGetLocal()))
    console.log(this.recievedModalItems)
    if (this.recievedModalItems[0].PaymentCheck) {
      this.courseMaterials = this.recievedModalItems[0].courseName
      if (this.PaymentPlans == 1) {
        this.DeivdeInstallment = this.recievedModalItems[0].courseFee

      } else if (this.PaymentPlans == 2) {
        let TembFee = this.recievedModalItems[0].courseFee / 3

        this.DeivdeInstallment = Math.round(TembFee * 100) / 100

      }
    } else {

      this.PaymentPlans = 2;

      this.courseMaterials = this.recievedModalItems[0].courseScheduleResponse.courseResponse.courseName

      let array = this.recievedModalItems[0].paymentResponse
      let arrayLength = this.recievedModalItems[0].paymentResponse.length


      for (let i: number = 0; i < arrayLength; i++) {
        const element = array[i];

        this.installmentTotal += Math.round(element.amountPaid * 100) / 100
      }
      this.installmentTotal = Math.round((this.recievedModalItems[0].courseScheduleResponse.courseResponse.courseFee - this.installmentTotal) * 100) / 100



      let TembFee = this.recievedModalItems[0].courseScheduleResponse.courseResponse.courseFee / 3
      this.DeivdeInstallment = Math.round(TembFee * 100) / 100

      if (arrayLength == 1) {
        this.SecondInstallment = Math.round(TembFee * 100) / 100
        this.ThirdInstallment = Math.round(TembFee * 100) / 100
      } else if (arrayLength == 2) {
        this.SecondInstallment = "Completed"
        this.ThirdInstallment = Math.round(TembFee * 100) / 100
      }

    }

  }

  AddCardDetails() {
    this.LocalCardDetails = JSON.parse(this.PaymentDataService.GetCardDetails())
  }


  CardFormSubmited(form: FormData) {
    localStorage.setItem('bankcard', JSON.stringify(form))
    this.AddCardDetails()

  }

  CancelPayment() {
    this.location.back();
    localStorage.removeItem("PurchaseCourse")
  }


  ConfirmPayment() {

    this.PaymentDataService.generateRandomNumber();
    this.PaymentDataService.GetOtp();
    const token = localStorage.getItem("token");
    const decode: any = token != null ? jwtDecode(token) : ""
    let Payment: any;
    if (this.recievedModalItems[0].PaymentCheck) {
      if (this.PaymentPlans == 1) {
        Payment = {
          studentId: decode.Id,
          courseScheduleId: this.recievedModalItems[0].id,
          paymentRequest: {
            paymentType: Number(this.PaymentPlans),
            paymentMethod: 1,
            amountPaid: Number(this.recievedModalItems[0].courseFee),
            installmentNumber: 0
          },
          PaymentCheck: true
        }
      } else if (this.PaymentPlans == 2) {
        Payment = {
          studentId: decode.Id,
          courseScheduleId: this.recievedModalItems[0].id,
          paymentRequest: {
            paymentType: Number(this.PaymentPlans),
            paymentMethod: 1,
            amountPaid: Number(this.DeivdeInstallment),
            installmentNumber: 1
          },
          PaymentCheck: true

        }
      }
    } else {

      let PayLength = this.recievedModalItems[0].paymentResponse
      let payData = this.recievedModalItems[0]
      Payment = {
        paymentType: Number(this.PaymentPlans),
        paymentMethod: 1,
        amountPaid: Number(this.DeivdeInstallment),
        installmentNumber: PayLength.length + 1,
        enrollmentId: payData.id,
        PaymentCheck: false
      }

    }
    this.PaymentDataService.adddPendingpayment(Payment)
    this.sendOtpMail();
  }


  sendOtpMail() {
    const studentToken = this.studentDataService.GetStudentDeatilByLocalStorage()
    if (this.PaymentDataService.generateRandomNumber()) {
      const otp = this.PaymentDataService.GetOtp()
      let mail: any = {
        name: studentToken.Name,
        otp: otp,
        email: studentToken.Email,
        emailType: 1
      }
      this.mailService.sendOtpMail(mail).subscribe({
        next: () => {
          this.router.navigate(['paymen-auth/otp-auth'])
        }, error: () => {
          this.tostr.error("Otp Send Failed")
        }
      })
    }


  }

}
