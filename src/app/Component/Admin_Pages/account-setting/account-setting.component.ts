import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../Service/API/Admin/admin.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../Modals/modals';

@Component({
  selector: 'app-account-setting',
  standalone: true,
  imports: [FormsModule,CommonModule],
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
    private readonly toastr:ToastrService
  ){
    const token = localStorage.getItem("token");
    if(token != null){
      const decode:any =jwtDecode(token)
      this.loginData = decode
    }
  }

  ngOnInit(): void {
    this.loadAdminData();
  }

  private loadAdminData():void{
    this.adminService.getadminbyID(this.loginData.Id).subscribe({
      next: (response:Admin) => {
        this.firstName = response.firstName
        this.lastName = response.lastName
        this.phone = response.phone
        this.email = response.email
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
        this.toastr.success('Changes saved successfully!', '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut:3000
        });
      },error:(error:any)=>{
        this.toastr.warning(error.error, '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut:3000
        });
      }
    })

    this.passwordNotMatch = false
  }
}
