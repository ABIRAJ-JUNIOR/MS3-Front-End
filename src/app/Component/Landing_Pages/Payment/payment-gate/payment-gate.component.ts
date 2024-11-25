import { Component } from '@angular/core';
import { PaymentDataService } from '../../../../Service/Payment/payment-data.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-gate',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment-gate.component.html',
  styleUrl: './payment-gate.component.css'
})
export class PaymentGateComponent {

  recievedModalItems: any[] = []; // Array to hold the received data



  CardFormData: FormGroup;

  constructor(private PaymentDataService: PaymentDataService, private fb: FormBuilder, private router: Router) {

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


  LocalCardDetails:any;

  ngOnInit(): void {
    this.loadItems();
   this.AddCardDetails()
    window.onpopstate = function () {
      history.pushState(null, '', location.href);
    };
    console.log(this.LocalCardDetails)
  }

  DeivdeInstallment: number = 0;
  loadItems(): void {
    this.recievedModalItems.push(JSON.parse(this.PaymentDataService.PurchaseDetailGetLocal()))
    console.log(this.recievedModalItems)
    let TembFee = this.recievedModalItems[0].courseFee / 3

    this.DeivdeInstallment = Math.round(TembFee * 100) / 100

  }





  AddCardDetails() {
    this.LocalCardDetails=JSON.parse(this.PaymentDataService.GetCardDetails())
  }


  CardFormSubmited(form: FormData) {
    localStorage.setItem('bankcard', JSON.stringify(form))
    this.AddCardDetails()

  }




  PaymentPlans: number = 1;


  CancelPayment() {
    this.router.navigate(['/course']);
    localStorage.removeItem("PurchaseCourse")
  }


  ConfirmPayment() {
    this.router.navigate(['paymen-auth/otp-auth'])
    this.PaymentDataService.generateRandomNumber();
  }

}
