import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { AdminService } from '../../../Service/API/Admin/admin.service';
import { Admin } from '../../../Modals/modals';
import { ToastrService } from 'ngx-toastr';

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
  admin:any="";
  profileImage:File | null = null;
  CoverfileImage:File | null = null;
  profileImageUrl: string | null = "";
  CoverImageUrl: string | null = "";


  constructor(private fb: FormBuilder,private  adminService:AdminService,private toastr:ToastrService) {
    // Initialize form controls
    this.updateUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Example pattern for 10-digit phone
    });
  }
  ngOnInit(): void {
    this.loaddata()
    
  }
  loaddata(){
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
console.log(this.updateUserForm.value);
const data=this.updateUserForm.value
this.adminService.updateAdminProfile(this.adminid,data).subscribe({
  next:(response:any)=>{
    this.toastr.success('Admin Updated successfully!', '', {
      positionClass: 'toast-top-right',
      progressBar: true,
      timeOut:3000
    });
    this.loaddata()
  }
  ,complete() {
    
  },
  error:(err:any)=> {
    error: (error:any) => {
      this.toastr.error(error.error, '', {
        positionClass: 'toast-top-right',
        progressBar: true,
        timeOut:4000
      });
    }
  },
})

  }
  patchData(admin:any){
    this.updateUserForm.patchValue({
      firstName: admin.firstName,
      lastName:admin.lastName,
      email:admin.email,
      phone:admin.phone

    })
  }

  onFileSelected(event: any, isCover:boolean): void {
    const file: File = event.target.files[0];
    if (file) {
      if(isCover){
        this.CoverfileImage = file;
        console.log(  this.CoverfileImage);
        this.previewImage(file,true);
      }else{
        this.profileImage = file;
        console.log(  this.profileImage);
        this.previewImage(file,false);
      }
    }
  }

  private previewImage(file: File,isCover:boolean): void {
    const reader = new FileReader();
   if(isCover){

    reader.onload = (e: any) => {
      this.CoverImageUrl = e.target.result;
    
      const formData = new FormData();
      formData.append('imageFile',  file);
      
      this.adminService.addImage(this.adminid,formData,true).subscribe({
        next: () => {
          this.toastr.success('Image updated successfully!', '', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut:3000
          });
        
        },
        complete: () => {
          this.loaddata()
        },
        error: (error:any) => {
          this.toastr.error(error.error, '', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut:4000
          });
          this.loaddata()
        }
      })
    };
    reader.readAsDataURL(file);
    

   }else{
    reader.onload = (e: any) => {
      this.admin.imageUrl = e.target.result;
    
      const formData = new FormData();
      formData.append('imageFile',  file);
      
      this.adminService.addImage(this.adminid,formData,false).subscribe({
        next: () => {
          this.toastr.success('Image updated successfully!', '', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut:3000
          });
        
        },
        complete: () => {
          this.loaddata()
        },
        error: (error:any) => {
          this.toastr.error(error.error, '', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut:4000
          });
          this.loaddata()
        }
      })
    };
    reader.readAsDataURL(file);
   }
  }
  
}
