import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PaymentDataService {

  // Initializing an empty array as the default value
  private dataSource = new BehaviorSubject<any[]>([]); // Array of any type (can be replaced with specific type)
  currentData = this.dataSource.asObservable(); // Expose the array as an observable

  constructor() {}

  // Method to change the array data
  changeData(data: any[]) {
    this.dataSource.next(data); // Update the array with new data
  }
}
