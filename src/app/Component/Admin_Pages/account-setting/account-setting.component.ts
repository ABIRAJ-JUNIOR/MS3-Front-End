import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../Service/API/Admin/admin.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../Modals/modals';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { WindowDataService } from '../../../Service/Biomatrics/window-data.service';
import { AuthService, SignIn } from '../../../Service/API/Auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-account-setting',
  standalone: true,
  imports: [FormsModule,CommonModule ,ReactiveFormsModule],
  providers: [BsModalService],
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
    private readonly modalService: BsModalService,
    private readonly windowDataService: WindowDataService,
    private readonly authService:AuthService,
    private cookieService: CookieService,
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
    this.enabledOrDisabled();
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', Validators.required],
      biometrics:[false]
    });
  }

  enabledOrDisabled():void{
    const storedCredential = this.getStoredCredential();
    if(storedCredential){
      this.userForm.patchValue({
        biometrics:true
      })      
    }else{
      this.userForm.patchValue({
        biometrics:false
      })   
    }
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
        this.removeStoredCredential();
        this.enabledOrDisabled();
      },complete:()=>{
        
      }
      ,error:(error:any)=>{
        this.toastr.warning(error.error, '');
      }
    })

    this.passwordNotMatch = false
  }

  //Bio Metrics

  onBiometricsToggle(template: TemplateRef<any>) {
    if (this.userForm.value.biometrics) {
      this.openModal(template)
    } else {
      this.openModal(template)
    }
  }

  modalRef?: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
  }

  closeModal() {
    this.modalRef?.hide();
    this.userForm.value.biometrics = false
  }

  register() {
    const emailInput = document.getElementById('email') as HTMLInputElement
    const passwordInput = document.getElementById('password') as HTMLInputElement

    const email = emailInput?.value.trim();
    const password = passwordInput?.value.trim();
    if (!email || !password) {
      alert('Please provide both email and password.');
      return;
    }

    const auth:SignIn = {
      email:emailInput.value,
      password:passwordInput.value
    }

    if(this.userForm.value.biometrics){

      this.authService.signIn(auth).subscribe({
        next:(response:string)=>{
          this.windowDataService.register(email,password);
        },
        error:(error:any)=>{
          this.toastr.warning(error.error, '');
          this.enabledOrDisabled();
        }
      })

    }else{
      this.authService.signIn(auth).subscribe({
        next:(response:string)=>{
          this.removeStoredCredential();
          this.enabledOrDisabled();
        },
        complete:()=>{
          this.toastr.success("Biometrics disabled")
        },
        error:(error:any)=>{
          this.toastr.warning(error.error, '');
          this.enabledOrDisabled();
        }
      })

    }

    this.closeModal();
  }

  private getStoredCredential(): any {
    const cookieName = 'webauthn_credential=';
    const cookies = document.cookie.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName)) {
        const credentialString = cookie.substring(cookieName.length);
        return JSON.parse(decodeURIComponent(credentialString));
      }
    }
    return null; 
  }

  private removeStoredCredential() {
    this.cookieService.delete('webauthn_credential', '/');
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

