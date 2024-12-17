import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuditlogService } from '../../../Service/API/AuditLog/auditlog.service';
import { AuthService } from '../../../Service/API/Auth/auth.service';
import { WindowDataService } from '../../../Service/Biomatrics/window-data.service';
import { AuditLogRequest } from '../../Admin_Pages/student-list/student-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signinForm!: FormGroup

  isBiometrics:boolean = false

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private rout: Router,
    private toastr: ToastrService,
    private readonly auditLogService: AuditlogService,
    private windowauth: WindowDataService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.enabledOrDisabled();
  }


  private initializeForm(): void {
    this.signinForm = this.fb.group({
      email: [localStorage.getItem('rememberedEmail') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [localStorage.getItem('rememberedEmail') ? true : false]
    });
  }

  

  onSubmit() {
    const { email, password, rememberMe } = this.signinForm.value;
    this.auth.signIn(this.signinForm.value).subscribe({
      next: (res: string) => {
        this.toastr.success("Login Successfull", "")
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
          const auditLog: AuditLogRequest = {
            action: 'Login',
            details: `Admin logged in to the system`,
            adminId: decode.Id,
          }
          this.auditLogService.addAuditLog(auditLog).subscribe({
            next: () => { },
            error: (error: any) => {
              console.error('Error adding audit log:', error.error);
            }
          })
          this.rout.navigate(['/admin-dashboard'])
        } else if (decode.Role == "Student") {
          this.rout.navigate(['/Way/home'])
        }

      }
      , error: (error) => {
        this.toastr.warning(error.error, "")
      }
    })
  }


  bioMatricsLogin() {
    const storedCredential = this.getStoredCredential();
    if (storedCredential) {
      this.windowauth.login();
    } else {
      this.rout.navigate(['/Way/bio'])
    }
  }
  enabledOrDisabled():void{
    const storedCredential = this.getStoredCredential();
    if(storedCredential){
      this.isBiometrics = true
    }else{
      this.isBiometrics = false
    }
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
}
