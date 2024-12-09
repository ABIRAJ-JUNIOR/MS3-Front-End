import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../Service/API/Admin/admin.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../Modals/modals';

@Component({
  selector: 'app-account-setting',
  standalone: true,
  imports: [FormsModule,CommonModule ,ReactiveFormsModule],
  templateUrl: './account-setting.component.html',
  styleUrl: './account-setting.component.css'
})
export class AccountSettingComponent implements OnInit {
  userForm!: FormGroup;
  profilePicture = 'https://via.placeholder.com/150'; 
  passwordNotMatch:boolean = false 
  loginData:any 
  constructor(
    private readonly adminService:AdminService,
    private readonly toastr:ToastrService,
    private fb: FormBuilder
  ){
    this.initializeForm();
    const token = localStorage.getItem("token");
    if(token != null){
      const decode:any =jwtDecode(token)
      this.loginData = decode
    }
  }

  ngOnInit(): void {
    this.loadAdminData();
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', Validators.required]
    });
  }


  private loadAdminData():void{
    this.adminService.getadminbyID(this.loginData.Id).subscribe({
      next: (response:Admin) => {
        
        this.userForm.patchValue({
          firstName:response.firstName,
          lastName:response.lastName,
          phone:response.phone,
          email:response.email
        })
        
        this.profilePicture = response.imageUrl
      }
    })
  }

  onProfilePictureChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profilePicture = reader.result as string;
      };
    }
  }
 
  onSubmit(){
    if (this.userForm.value.newPassword !== this.userForm.value.confirmPassword) {
      this.passwordNotMatch = true
      return;
    }
    
    const form = this.userForm.value;

    if(form){
      for (const key in form) {
        if (form[key] === '') form[key] = null;
      }
    }
 
    this.adminService.updateAdminProfile(this.loginData.Id,form).subscribe({
      next: (response) => {
        this.toastr.success('Changes saved successfully!', '');
      },error:(error:any)=>{
        this.toastr.warning(error.error, '');
      }
    })

    this.passwordNotMatch = false
  }
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    if (!password) return null; 

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    const isValidLength = password.length >= 8;

    if (!isValidLength) {
      return { passwordInvalid: { message: 'Password must be at least 8 characters long.' } };
    }
    if (!hasUpperCase) {
      return { passwordInvalid: { message: 'Password must contain at least one uppercase letter.' } };
    }
    if (!hasLowerCase) {
      return { passwordInvalid: { message: 'Password must contain at least one lowercase letter.' } };
    }
    if (!hasDigit) {
      return { passwordInvalid: { message: 'Password must contain at least one digit.' } };
    }
    if (!hasSpecialChar) {
      return { passwordInvalid: { message: 'Password must contain at least one special character (@$!%*?&).' } };
    }

    return null;
  };
}

