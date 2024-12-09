import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../Modals/modals';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from '../../../Service/API/Admin/admin.service';
import { jwtDecode } from 'jwt-decode';
import { AuditlogService } from '../../../Service/API/AuditLog/auditlog.service';
import { AuditLogRequest } from '../student-list/student-list.component';
import { passwordValidator } from '../account-setting/account-setting.component';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  providers: [BsModalService],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent implements OnInit{
  admins: Admin[] = [];

  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;
  currentLength: number = 0;
  totalItems: number = 0;

  // Form and update state
  profileForm!: FormGroup;
  isUpdate: boolean = false;

  // Profile image variables
  profileImageUrl: string | null = null;
  selectedFile: File | null = null;

  // Modal-related variables
  modalRef?: BsModalRef;

  // Admin ID for update/delete operations
  private adminId: string = '';

  loginData!:any

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private readonly auditLogService:AuditlogService
  ){
    this.initializeForm();
  
    const token = localStorage.getItem("token");
    if(token != null){
      const decode:any =jwtDecode(token)
      this.loginData = decode
      console.log(this.loginData)
    }
  }

  ngOnInit(): void {
    this.loadItems();
  }

  private initializeForm(): void {
    this.profileForm = this.fb.group(
      {
        nic: ['', [Validators.required, Validators.pattern(/^\d{9}[Vv]|\d{12}$/)]],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: ['', [Validators.required,passwordValidator()]],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  loadItems(): void {
    this.adminService.pagination(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.admins = response.items;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItem;
      },
      complete: () => {
        this.currentLength = this.admins.length;
      },
      error: () => {
        console.log('Failed to load data');
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadItems();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;
      const reader = new FileReader();

      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const formData = this.profileForm.value;
    formData.role = Number(formData.role);

    const adminData: AdminRequest = {
      nic: formData.nic,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
    };

    if (!this.isUpdate) {
      this.addAdmin(adminData);
    } else {
      this.updateAdmin(adminData);
    }
  }

  private addAdmin(adminData: AdminRequest): void {
    this.adminService.addAdmin(adminData).subscribe({
      next: (response: any) => {
        this.adminId = response.id;
        this.toastr.success('Admin registered successfully!', '');
        this.loadItems();

        const auditLog:AuditLogRequest = {
          action: 'Add New Admin',
          details: `Added a new Admin with ID (${response.id})`,
          adminId: this.loginData.Id,
        }
        this.auditLogService.addAuditLog(auditLog).subscribe({
          next:()=>{},
          error: (error: any) => {
            console.error('Error adding audit log:', error.error);
          }
        })
      },
      complete: () => {
        this.uploadImage()
        this.resetForm();
      },
      error: (error:any) => {
        this.toastr.error(error.error, '');
      }
    });
  }

  private updateAdmin(adminData: AdminRequest): void {
    this.adminService.updateFullDetails(this.adminId, adminData).subscribe({
      next: (response:Admin) => {
        this.toastr.success('Admin updated successfully!', '');
        this.loadItems();

        const auditLog:AuditLogRequest = {
          action: 'Update Admin',
          details: `Update a Admin with ID (${response.id})`,
          adminId: this.loginData.Id,
        }
        this.auditLogService.addAuditLog(auditLog).subscribe({
          next:()=>{},
          error: (error: any) => {
            console.error('Error adding audit log:', error.error);
          }
        })
      },
      complete: () => {
        this.uploadImage()
      },
      error: (error:any) => {
        this.toastr.error(error.error, '');
      }
    });
  }

  // Upload profile image
  private uploadImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      console.log(this.selectedFile);
      
      formData.append('imageFile', this.selectedFile);
      this.adminService.addImage(this.adminId, formData , false).subscribe({
        complete:()=>{
          this.loadItems();
        },
        error: () => {
          this.toastr.error('Image upload failed', '');
        }
      });
    }
  }

  editAdmin(isEditMode: boolean): void {
    this.isUpdate = isEditMode;
    if (!isEditMode){
      this.profileForm.get('nic')?.enable();
      this.profileForm.get('email')?.enable();
      this.resetForm();
    }
  }

  patchData(admin: Admin): void {
    this.profileImageUrl = admin.imageUrl
    this.profileForm.patchValue({
      nic: admin.nic,
      firstName: admin.firstName,
      lastName: admin.lastName,
      phone: admin.phone,
      email:admin.email,
      role:admin.roleName == "Administrator" ? "1" : "2"
    });
    this.adminId = admin.id;
    this.profileForm.get('nic')?.disable();
    this.profileForm.get('email')?.disable();
  }

  openPreviewModal(template: any, image: string): void {
    this.profileImageUrl = image;
    this.modalRef = this.modalService.show(template);
  }

  openDeleteModal(template: any, adminId: string): void {
    this.modalRef = this.modalService.show(template);
    this.adminId = adminId;
  }

  deleteAdmin(): void {
    this.adminService.deleteAdmin(this.adminId).subscribe({
      next: () => {
        this.toastr.success('Admin deleted successfully!', '');
        this.loadItems();

        const auditLog:AuditLogRequest = {
          action: 'Delete Admin',
          details: `Delete Admin with ID (${this.adminId})`,
          adminId: this.loginData.Id,
        }
        this.auditLogService.addAuditLog(auditLog).subscribe({
          next:()=>{},
          error: (error: any) => {
            console.error('Error adding audit log:', error.error);
          }
        })
      },
      complete: () => this.modalRef?.hide(),
      error: () => {
        this.toastr.error('Failed to delete admin', '');
      },
    });
  }

  private resetForm(): void {
    this.profileForm.reset({
      role:''
    });
    this.resetImage();
    this.isUpdate = false;
  }

  private resetImage(): void {
    this.profileImageUrl = null;
    this.selectedFile = null;
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
