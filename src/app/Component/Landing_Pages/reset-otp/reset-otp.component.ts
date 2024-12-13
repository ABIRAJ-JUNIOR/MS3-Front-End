import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OtpVerficationService } from '../../../Service/API/OTP/otp-verfication.service';
import { passwordValidator } from '../../Admin_Pages/account-setting/account-setting.component';

@Component({
  selector: 'app-reset-otp',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './reset-otp.component.html',
  styleUrl: './reset-otp.component.css',
})
export class ResetOtpComponent {
  email: any;
  ValidationCheck: boolean = false;
  changePasswordForm: FormGroup;

  constructor(
    private otpService: OtpVerficationService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email');
      if (!this.email || !this.isValidEmail(this.email)) {
        this.toastr.error('Invalid email address.', 'Error');
        this.router.navigate(['/signin/reset']);
      }
    });

    this.changePasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, passwordValidator()]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }
  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
  }

  OTP: string = '';

  onSubmit() {
    let otpGet = document.getElementById('otp') as HTMLInputElement;
    let verify = {
      otp: otpGet.value.toString(),
      email: this.email,
    };
    this.otpService.verifyOtp(verify).subscribe({
      next: (response: any) => {
        this.toastr.success(response);
        this.ValidationCheck = true;
      },
      error: (error: any) => {
        this.toastr.error(
          error.error || 'OTP verification failed. Please try again.'
        );
      },
    });
  }

  ChangePassword() {
    let changePass = {
      email: this.email,
      NewPassword: this.changePasswordForm.get('newPassword')?.value,
    };
    console.log(changePass);
    this.otpService.changePassword(changePass).subscribe({
      next: (response: any) => {
        this.toastr.success(response);
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }
}
