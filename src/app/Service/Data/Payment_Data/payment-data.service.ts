import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentDataService {

  constructor(private route: Router) {

  }

  PurchaseDetailsSetLocal(data: any): void {
    localStorage.removeItem('PurchaseCourse')
    localStorage.setItem('PurchaseCourse', JSON.stringify(data))
    this.route.navigate(['paymen-auth/paymentgate'])
  }
  PurchaseDetailGetLocal(): any {
    return localStorage.getItem('PurchaseCourse') || []
  }
  generateRandomNumber():boolean {
    let otp: number = Math.floor(100000 + Math.random() * 900000);
    sessionStorage.setItem('paymentOtp', JSON.stringify(otp))
    return true
  }

  GetOtp(): any {
    return sessionStorage.getItem('paymentOtp')
  }

  GetCardDetails(): any {
    return localStorage.getItem('bankcard')
  }


  adddPendingpayment(data: any) {
    localStorage.removeItem('pendingPayment')
    localStorage.setItem('pendingPayment', JSON.stringify(data))
  }

  getPendingPayment(): any {
    return localStorage.getItem('pendingPayment')
  }

  ClearAllPAymentData() {
    localStorage.removeItem('paymentOtp')
    localStorage.removeItem('PurchaseCourse')
    localStorage.removeItem('pendingPayment')
  }

}
