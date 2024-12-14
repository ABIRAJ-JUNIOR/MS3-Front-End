import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { AdminService } from '../../../Service/API/Admin/admin.service';
import { Admin } from '../../../Modals/modals';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Service/API/Auth/auth.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit{
  adminid:string="";
  admin:any="";
  profileImage:File | null = null;
  CoverfileImage:File | null = null;
  profileImageUrl: string | null = "";
  CoverImageUrl: string | null = "";

  constructor(
    private readonly adminService:AdminService,
    private readonly toastr:ToastrService,
    private readonly authService:AuthService
  ) {
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
          this.toastr.success('CoverImage updated successfully!', '');
        
        },
        complete: () => {
          this.loaddata()
        },
        error: (error:any) => {
          this.toastr.error(error.error, '');
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
        next: (res:any) => {
          console.log(res);
          
          this.toastr.success('Image updated successfully!', '');
        
        },
        complete: () => {
          this.loaddata()
        },
        error: (error:any) => {
          this.toastr.error(error.error, '');
          this.loaddata()
        }
      })
    };
    reader.readAsDataURL(file);
   }
  }

  logout(){
    this.authService.logout();
  }
  
}
