import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OtpVerficationService } from '../../../Service/API/OTP/otp-verfication.service';

@Component({
  selector: 'app-reset-otp',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './reset-otp.component.html',
  styleUrl: './reset-otp.component.css'
})
export class ResetOtpComponent {
  email:string="";
  ValidationCheck:boolean=false;
  
  constructor(
    private otpService: OtpVerficationService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      if (!this.email || !this.isValidEmail(this.email)) {
        this.toastr.error('Invalid email address.', 'Error');
        this.router.navigate(['/error-page']); 
      }
    });
  }
  private isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
  }

  OTP:number=0

 onSubmit() {
  let verify={
    email:
  }
   this.otpSerivce.verifyOtp()
   
      
 }
}
