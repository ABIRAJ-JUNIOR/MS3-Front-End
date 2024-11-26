import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Admin, Student } from '../Modals/modals';
import { StudentService } from '../Service/Student/student.service';
import { AdminRequest } from '../Component/Admin_Pages/admin-list/admin-list.component';
import { AdminService } from '../Service/Admin/admin.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
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
    selectedImage: string | null = null;
    modalRef?: BsModalRef;
  
    // Admin ID for update/delete operations
    private adminId: string = '';
    private deleteAdminId: string = '';
  
    constructor(
      private adminService: AdminService,
      private fb: FormBuilder,
      private toastr: ToastrService,
      private modalService: BsModalService
    ) {
      // Initialize form with validators
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
  
    // Custom validator for password match
    passwordMatchValidator(control: AbstractControl) {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
  
    // Load paginated admin data
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
  
    // Navigate to a specific page
    goToPage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.loadItems();
      }
    }
  
    // Handle file input selection
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
  
    // Submit form data for create or update
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
          });
          this.resetForm();
          this.loadItems();
        },
        complete: () => this.uploadImage(),
        error: (error:any) => {
          this.toastr.error(error.error, '', {
            positionClass: 'toast-top-right',
            progressBar: true,
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
          });
          this.resetForm();
          this.loadItems();
        },
        complete: () => this.uploadImage(),
        error: (error:any) => {
          this.toastr.error(error.error, '', {
            positionClass: 'toast-top-right',
            progressBar: true,
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
          next: () => this.loadItems(),
          error: () => {
            this.toastr.error('Image upload failed', '', {
              positionClass: 'toast-top-right',
            });
          }
        });
        this.resetImage();
      }
    }
  
    // Edit admin mode toggle
    editAdmin(isEditMode: boolean): void {
      this.isUpdate = isEditMode;
      if (!isEditMode) this.resetForm();
    }
  
    // Patch admin data to form for editing
    patchData(admin: Admin): void {
      this.profileForm.patchValue({
        nic: admin.nic,
        firstName: admin.firstName,
        lastName: admin.lastName,
        phone: admin.phone,
      });
      this.adminId = admin.id;
    }
  
    // Open modal to preview image
    openPreviewModal(template: any, image: string): void {
      this.selectedImage = image;
      this.modalRef = this.modalService.show(template);
    }
  
    // Open delete confirmation modal
    openDeleteModal(template: any, adminId: string): void {
      this.modalRef = this.modalService.show(template);
      this.deleteAdminId = adminId;
    }
  
    // Delete an admin
    deleteAdmin(): void {
      this.adminService.deleteAdmin(this.deleteAdminId).subscribe({
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
  

