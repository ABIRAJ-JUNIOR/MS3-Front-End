import { Component } from '@angular/core';
import { PaymentDataService } from '../../../Service/Payment/payment-data.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  recievedModalItems: string[] = []; // Array to hold the received data

  constructor(private PaymentDataService: PaymentDataService) { }

  ngOnInit() {
    this.PaymentDataService.currentData.subscribe((data) => {
      this.recievedModalItems = data; // Update the array with received data
    });
  }
}
