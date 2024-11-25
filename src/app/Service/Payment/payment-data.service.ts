import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentDataService {

  constructor(private route: Router) {

  }

  PurchaseDetailsSetLocal(data: any): void {
    localStorage.setItem('PurchaseCourse', JSON.stringify(data))
    this.route.navigate(['paymen-auth/paymentgate'])
  }
  PurchaseDetailGetLocal(): any {
    return localStorage.getItem('PurchaseCourse') || []
  }
  
}
