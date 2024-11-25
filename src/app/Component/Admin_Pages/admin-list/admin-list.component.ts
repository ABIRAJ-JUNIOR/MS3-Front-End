import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../../Service/Admin/admin.service';
import { Admin } from '../../../Modals/modals';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  providers: [BsModalService],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent {
  admins: Admin[] = [];
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;
  currentLength:number = 0;
  totalItems:number = 0;

  profileForm: FormGroup;
 


  constructor(private adminService: AdminService,private fb: FormBuilder, private toastr:ToastrService ,private modalService: BsModalService) {

    this.profileForm = this.fb.group({
      nic: ['', [Validators.required, Validators.pattern(/^\d{9}[Vv]|\d{12}$/)]], // Example NIC validation
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator }
  )
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.adminService.pagination(this.currentPage , this.pageSize).subscribe({
      next:((response:any) => {
        this.totalPages = response.totalPages
        this.totalItems = response.totalItem
        this.admins = response.items
      }),
      complete:() => {
        this.currentLength = this.admins.length
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadItems();
    }
  }

  profileImageUrl: string | null = null;
  selectedFile:File | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file
      const reader = new FileReader();

      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }


  private adminId:string = ''
  onSubmit(fileInput: HTMLInputElement) {
    const formData = this.profileForm.value
    formData.role = Number(formData.role)

    const admindata:AdminRequest = {
      nic:formData.nic,
      firstName: formData.firstName,
      lastName:formData.lastName,
      role:formData.role,
      email:formData.email,
      phone:formData.phone,
      password:formData.password,
    }   

    this.adminService.addAdmin(admindata).subscribe({
      next: (response:any) => {
        this.adminId = response.id
        this.toastr.success("Register Successfull" , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:3000
        })
      this.profileForm.reset();
      },
      complete:()=>{
        const formdata = new FormData();
        formdata.append('imageFile' , this.selectedFile!);
        this.adminService.addimage(this.adminId , formdata).subscribe({
          next:(response:any)=>{
            this.loadItems();
          }
        })
        this.profileImageUrl = null;
        this.selectedFile = null;
        fileInput.value = '';
      },
      error:(error)=>{
        this.toastr.warning(error.error , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:3000
        })
      }
    })
  } 

  selectedImage: string | null = null;
  modalRef?: BsModalRef;

  openPreViewModal(template: any, image: string): void {
    this.selectedImage = image;
    this.modalRef = this.modalService.show(template);
  }

  private deleteAdminId:string = ''
  openModal(template: any , adminId:string): void {
    this.modalRef = this.modalService.show(template);
    this.deleteAdminId = adminId
  }

  deleteEmployee(): void {
    this.adminService.deleteAdmin(this.deleteAdminId).subscribe({
      next: (response: any) => {
        this.toastr.success("Delete Successfull" , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:3000
        })
      },
      complete:()=>{
        this.loadItems();
      }
    })
    this.modalRef?.hide();
  }
}

export interface AdminRequest{
  nic: string;
  firstName: string;
  lastName: string;
  phone: string;
  email:string
  password:string
  role:number
}
