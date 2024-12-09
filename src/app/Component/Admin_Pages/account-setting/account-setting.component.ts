import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule,CommonModule,],
  providers: [BsModalService],
  templateUrl: './account-setting.component.html',
  styleUrl: './account-setting.component.css'
})
export class AccountSettingComponent implements OnInit {
  firstName = 'John';
  lastName = 'Doe';
  phone = '0702274212'
  email = 'john.doe@example.com';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  language = 'English';
  profilePicture = 'https://via.placeholder.com/150'; 


  passwordNotMatch:boolean = false 
  loginData:any 
  constructor(
    private readonly adminService:AdminService,
    private readonly toastr:ToastrService,
    private readonly modalService: BsModalService,
    private readonly windowDataService: WindowDataService,
    private readonly authService:AuthService,
    private cookieService: CookieService
  ){
    const token = localStorage.getItem("token");
    if(token != null){
      const decode:any =jwtDecode(token)
      this.loginData = decode
    }
  }

  ngOnInit(): void {
    this.loadAdminData();
    const storedCredential = this.getStoredCredential();
    if(storedCredential){
      this.isBiometricsEnabled = true
    }
  }

  private loadAdminData():void{
    this.adminService.getadminbyID(this.loginData.Id).subscribe({
      next: (response:Admin) => {
        this.firstName = response.firstName
        this.lastName = response.lastName
        this.phone = response.phone
        this.email = response.email
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
 
  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordNotMatch = true
      return;
    }
 
    const accountDetails = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      currentPassword: this.currentPassword != "" ? this.currentPassword : null,
      newPassword: this.newPassword != "" ? this.newPassword : null,
    }
 
    this.adminService.updateAdminProfile(this.loginData.Id,accountDetails).subscribe({
      next: (response) => {
        this.toastr.success('Changes saved successfully!', '');
      },error:(error:any)=>{
        this.toastr.warning(error.error, '');
      }
    })

    this.passwordNotMatch = false
  }

  //Bio Metrics
  isBiometricsEnabled: boolean = false;

  onBiometricsToggle(template: TemplateRef<any>) {
    if (this.isBiometricsEnabled) {
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
    this.isBiometricsEnabled = false
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

    if(this.isBiometricsEnabled){

      this.authService.signIn(auth).subscribe({
        next:(response:string)=>{
        },complete:()=>{
          this.windowDataService.register(email,password);
        },
        error:(error:any)=>{
          this.toastr.warning(error.error, '');
        }
      })

    }else{
      this.authService.signIn(auth).subscribe({
        next:(response:string)=>{
        },complete:()=>{
          this.removeStoredCredential();
        },
        error:(error:any)=>{
          this.toastr.warning(error.error, '');
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
