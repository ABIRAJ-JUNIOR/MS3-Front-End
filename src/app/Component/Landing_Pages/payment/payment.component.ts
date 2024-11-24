import { Component, OnInit } from '@angular/core';
import { PaymentDataService } from '../../../Service/Payment/payment-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  recievedModalItems: any[] = []; // Array to hold the received data

  constructor(private PaymentDataService: PaymentDataService) {
    
   }

  ngOnInit():void{
    
  }
 
}
