import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private dataKey = 'sharedData'; 
  private dataSource = new BehaviorSubject<any>(this.getStoredData());
  currentData = this.dataSource.asObservable();

  constructor() {}

  private getStoredData(): any {
    const data = localStorage.getItem(this.dataKey);
    return data ? JSON.parse(data) : null;
  }

  updateData(data: any) {
    this.dataSource.next(data);
    localStorage.setItem(this.dataKey, JSON.stringify(data));
  }
}
