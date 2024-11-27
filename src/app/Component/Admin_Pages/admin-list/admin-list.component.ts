import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class AdminListComponent implements OnInit{
  admins: Admin[] = [];
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;
  currentLength: number = 0;
  totalItems: number = 0;

  // Form and update state
  profileForm: FormGroup;
  isUpdate: boolean = false;

  // Profile image variables
  profileImageUrl: string | null = null;
  selectedFile: File | null = null;

  // Modal-related variables
  modalRef?: BsModalRef;

  // Admin ID for update/delete operations
  private adminId: string = '';

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService
  ){
    this.profileForm = this.fb.group(
      {
        nic: ['', [Validators.required, Validators.pattern(/^\d{9}[Vv]|\d{12}$/)]],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.loadItems();
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
        this.toastr.error('Failed to load data', '', {
          positionClass: 'toast-top-right',
          progressBar: true,
        });
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

  // Add a new admin
  private addAdmin(adminData: AdminRequest): void {
    this.adminService.addAdmin(adminData).subscribe({
      next: (response: any) => {
        this.adminId = response.id;
        this.toastr.success('Admin registered successfully!', '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut:3000
        });
        this.loadItems();
      },
      complete: () => {
        this.uploadImage()
        this.resetForm();
        this.loadItems();
      },
      error: (error:any) => {
        this.toastr.error(error.error, '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut:4000
        });
      }
    });
  }

  // Update an existing admin
  private updateAdmin(adminData: AdminRequest): void {
    this.adminService.updateFullDetails(this.adminId, adminData).subscribe({
      next: () => {
        this.toastr.success('Admin updated successfully!', '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut:3000
        });
        this.loadItems();
      },
      complete: () => {
        this.uploadImage()
        this.loadItems();
      },
      error: (error:any) => {
        this.toastr.error(error.error, '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut:4000
        });
      }
    });
  }

  // Upload profile image
  private uploadImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('imageFile', this.selectedFile);
      this.adminService.addImage(this.adminId, formData).subscribe({
        error: () => {
          this.toastr.error('Image upload failed', '', {
            positionClass: 'toast-top-right',
          });
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
        this.toastr.success('Admin deleted successfully!', '', {
          positionClass: 'toast-top-right',
          progressBar: true,
        });
        this.loadItems();
      },
      error: () => {
        this.toastr.error('Failed to delete admin', '', {
          positionClass: 'toast-top-right',
        });
      },
      complete: () => this.modalRef?.hide(),
    });
  }

  // Reset form and image
  private resetForm(): void {
    this.profileForm.reset();
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
