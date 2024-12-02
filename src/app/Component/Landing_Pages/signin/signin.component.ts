import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Service/API/Auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  StudentLogin: FormGroup

  constructor( private fb: FormBuilder, private auth: AuthService, private rout: Router, private toastr: ToastrService) {
    this.StudentLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.auth.signIn(this.StudentLogin.value).subscribe({
      next: (res: string) => {
        this.toastr.success("Login Successfull", "", {
          positionClass: "toast-top-right",
          progressBar: true,
          timeOut: 3000
        })
        localStorage.setItem('token', res)
      }, complete: () => {
        const token: string = localStorage.getItem("token")!;
        const decode: any = jwtDecode(token)
        if (decode.Role == "Administrator" || decode.Role == "Instructor") {
          this.rout.navigate(['/admin-dashboard'])
        } else if (decode.Role == "Student") {
          this.rout.navigate(['/home'])
        }

      }
      , error: (error) => {
        this.toastr.warning(error.error, "", {
          positionClass: "toast-top-right",
          progressBar: true,
          timeOut: 3000
        })
      }
    })
  }

}
