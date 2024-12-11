import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-otp',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './reset-otp.component.html',
  styleUrl: './reset-otp.component.css'
})
export class ResetOtpComponent {
  email:string="";
  constructor(){
   
  }

 onSubmit() {
   
   
      
 }
}
