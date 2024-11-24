import { Component } from '@angular/core';
import { PaymentDataService } from '../../../../Service/Payment/payment-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-gate',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './payment-gate.component.html',
  styleUrl: './payment-gate.component.css'
})
export class PaymentGateComponent {

  recievedModalItems: any[] = []; // Array to hold the received data

  constructor(private PaymentDataService: PaymentDataService) {
    
   }

  ngOnInit():void{

    this.loadItems()

  }
 
  loadItems():void{
    this.recievedModalItems.push(JSON.parse( this.PaymentDataService.PurchaseDetailGetLocal() ))
    console.log(this.recievedModalItems)
  }
}
