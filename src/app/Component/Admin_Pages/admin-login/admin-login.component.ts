import { Component } from '@angular/core';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [Navebar01Component,FooterComponent,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  showPassword:boolean = false;
  loading:boolean = false

  AdminUsername:string = "Admin"
  AdminPassword:string = "admin1234"


  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      showpassword: [false]
    });
    this.loading = false
  }

  togglePassword() {
    this.showPassword = this.loginForm.value.showpassword;
  }

  onSubmit() {

    if (this.AdminUsername == this.loginForm.value.username && this.AdminPassword == this.loginForm.value.password){
      this.toastr.success("Login Successfully.." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:4000
      })
    this.loading = true;
    }else{
      this.toastr.warning("username or password incorrect." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:4000
      })
      this.loginForm.reset();
    }
    
  }
}
