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
  textToType: string = "Your Sign-In Can Change the World";
  displayedText: string = ""; 
  typingSpeed: number = 100; 

  signinForm: FormGroup
  constructor( private fb: FormBuilder, private auth: AuthService, private rout: Router, private toastr: ToastrService) {
    this.signinForm = this.fb.group({
      email: [localStorage.getItem('rememberedEmail') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [localStorage.getItem('rememberedEmail') ? true : false]
    });
  }

  ngOnInit(): void {
    this.startTypingEffect();
  }

  startTypingEffect(): void {
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < this.textToType.length) {
        this.displayedText += this.textToType[index];
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, this.typingSpeed);
  }


  onSubmit() {
    const { email, password, rememberMe } = this.signinForm.value;
    this.auth.signIn(this.signinForm.value).subscribe({
      next: (res: string) => {
        this.toastr.success("Login Successfull", "", {
          positionClass: "toast-top-right",
          progressBar: true,
          timeOut: 2000
        })
        localStorage.setItem('token', res)

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
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
