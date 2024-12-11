import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OtpVerficationService } from '../../../Service/API/OTP/otp-verfication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

   verificationEmail:string="";
   constructor(
    private otpSerivce:OtpVerficationService,
    private tostr:ToastrService,
    private route:Router        
   ){
    
   }

  onSubmit() {
   let EmailVerfiy={
    email:this.verificationEmail
   }
     this.otpSerivce.sendOtp(EmailVerfiy).subscribe({
      next:(response:any)=>{
        this.tostr.success(response)
      },error:(error)=>{
        this.tostr.error(error.error)
      },complete:()=> {
        this.route.navigate(['/signin/reset-otp/'+this.verificationEmail])
      },
     })

  }


}
