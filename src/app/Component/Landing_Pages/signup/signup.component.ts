import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, SignUp } from '../../../Service/API/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { passwordValidator } from '../../Admin_Pages/account-setting/account-setting.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule,BsDatepickerModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


  StudentRegistration: FormGroup;

  constructor( private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private rout: Router) {
    this.StudentRegistration = this.fb.group({
      nic: ['', [Validators.required, Validators.pattern('^[0-9]{9}[Vv]$|^[0-9]{12}$')]],
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }

  onSubmit() {
    const form = this.StudentRegistration.value;
    const student: SignUp = {
      nic: form.nic,
      firstName: form.firstName,
      lastName: form.lastName,
      dateOfBirth: form.dateOfBirth,
      gender: Number(form.gender),
      email: form.email,
      phone: form.phone,
      password: form.password
    }

    this.authService.signUp(student).subscribe({
      next: (response) => {
        this.toastr.success("User SignUp Successfull", "")
        this.StudentRegistration.reset()
      }, complete: () => {
        this.rout.navigate(['/signin'])

      }, error: (error) => {
        this.toastr.warning(error.error, "")
      }
    })

  }

}
