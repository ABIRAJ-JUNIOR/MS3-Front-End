import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  constructor(private spinnerService:NgxSpinnerService) { }

  busy(){
    this.busyRequestCount++;
    this.spinnerService;
    this.spinnerService.show(undefined,{
      type: 'ball-atom',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color:'#df1010',
      size:'medium'
    });
  }

  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0){
      this.busyRequestCount = 0
      this.spinnerService.hide();
    }
  }
}
