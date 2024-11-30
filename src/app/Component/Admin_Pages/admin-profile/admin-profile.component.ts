import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { AdminService } from '../../../Service/API/Admin/admin.service';
import { Admin } from '../../../Modals/modals';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit{
  updateUserForm: FormGroup;
  adminid:string="";
  admin:any=""
  constructor(private fb: FormBuilder,private  adminService:AdminService) {
    // Initialize form controls
    this.updateUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Example pattern for 10-digit phone
    });
  }
  ngOnInit(): void {
    const token:string = localStorage.getItem("token")!;
    const decode:any = jwtDecode(token)
    this.adminid= decode.Id
    console.log(decode);
    this.adminService.getadminbyID(this.adminid).subscribe((response:any)=>{
      console.log(response);
      this.admin=response
      
    })
    
  }
  
  onEditProfile() {
    console.log('Edit Profile button clicked');
  }

  onAccountSettings() {
    console.log('Account Settings button clicked');
  }
  onSubmit(){

  }
  
}
