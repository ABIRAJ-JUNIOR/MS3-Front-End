import { Component } from '@angular/core';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [Navebar01Component,FooterComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export class StudentLoginComponent {
  studentLoginForm: FormGroup;
  showPassword:boolean = false;
  loading:boolean = false
  

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.studentLoginForm = this.formBuilder.group({
      nic: ['', Validators.required],
      password: ['', Validators.required],
      showpassword: [false]
    });
    this.loading = false
  }

  togglePassword() {
    this.showPassword = this.studentLoginForm.value.showpassword;
  }

  onStudentSubmit(){

  }

  
}
