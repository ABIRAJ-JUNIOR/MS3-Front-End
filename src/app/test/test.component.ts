import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../Modals/modals';
import { StudentService } from '../Service/Student/student.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
 // Data properties
 students: Student[] = [];
 studentId: string = '';
 deleteStudentId: string = '';
 selectedImage: string | null = null;
 modalRef?: BsModalRef;

 // Pagination
 currentPage: number = 1;
 pageSize: number = 8;
 totalPages: number = 0;
 totalItems: number = 0;

 // Form and File Handling
 profileForm!: FormGroup;
 isUpdate: boolean = false;
 profileImage: File | null = null;
 profileImageUrl: string | null = '';

 constructor(
   private readonly studentService: StudentService,
   private readonly router: Router,
   private readonly toastr: ToastrService,
   private readonly fb: FormBuilder,
   private readonly modalService: BsModalService
 ) {}

 ngOnInit(): void {
   this.initializeForm();
   this.loadStudents();
 }

 // Initialize the profile form with validation
 private initializeForm(): void {
   this.profileForm = this.fb.group({
     nic: ['', Validators.required],
     firstName: ['', Validators.required],
     lastName: ['', Validators.required],
     dateOfBirth: ['', Validators.required],
     gender: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
     password: [
       '',
       [
         Validators.required,
         Validators.minLength(8),
         Validators.pattern(/(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/),
       ],
     ],
     confirmPassword: ['', Validators.required],
     address: this.fb.group({
       addressLine1: [''],
       addressLine2: [''],
       city: [''],
       postalCode: [''],
       country: [''],
     }),
   });
 }

 // Load students with pagination
 loadStudents(): void {
   this.studentService.pagination(this.currentPage, this.pageSize).subscribe({
     next: (response: any) => {
       this.students = response.items;
       this.totalPages = response.totalPages;
       this.totalItems = response.totalItems;
     },
   });
 }

 // Navigate to a specific page
 goToPage(page: number): void {
   if (page >= 1 && page <= this.totalPages) {
     this.currentPage = page;
     this.loadStudents();
   }
 }

 // Navigate to the student report page
 goToReport(studentId: string): void {
   this.router.navigate(['/admin-dashboard/student-report', studentId]);
 }

 // Form control getter for template-driven validation
 get formControls() {
   return this.profileForm.controls;
 }

 // Handle file selection and preview
 onFileSelected(event: any): void {
   const file: File = event.target.files[0];
   if (file) {
     this.profileImage = file;
     this.previewImage(file);
   }
 }

 // Preview the selected image
 private previewImage(file: File): void {
   const reader = new FileReader();
   reader.onload = (e: any) => {
     this.profileImageUrl = e.target.result;
   };
   reader.readAsDataURL(file);
 }

 // Submit the form for add or update
 onSubmit(): void {
   const formData = this.prepareFormData();

   if (!this.isUpdate) {
     this.addStudent(formData);
   } else {
     this.updateStudent(formData);
   }
 }

 // Prepare form data with null checks
 private prepareFormData(): any {
   const form = this.profileForm.value;

   for (const key in form) {
     if (form[key] === '') form[key] = null;
   }

   // Address handling
   if (
     !form.address?.addressLine1 &&
     !form.address?.addressLine2 &&
     !form.address?.city &&
     !form.address?.postalCode &&
     !form.address?.country
   ) {
     form.address = null;
   }

   // Convert gender to number
   form.gender = Number(form.gender);

   return form;
 }

 // Add a new student
 private addStudent(formData: any): void {
   this.studentService.addStudent(formData).subscribe({
     next: (response: any) => {
       this.studentId = response.id;
       this.toastr.success('Registration Successful', '', {
         positionClass: 'toast-top-right',
         progressBar: true,
         timeOut: 3000,
       });
       this.resetForm();
       this.uploadImage(this.studentId);
     },
     error: (error: any) => {
       this.handleError(error);
     },
   });
 }

 // Update an existing student
 private updateStudent(formData: any): void {
   formData.dateOfBirth = new Date(formData.dateOfBirth);

   this.studentService.updateFullDetails(this.studentId, formData).subscribe({
     next: () => {
       this.toastr.success('Update Successful', '', {
         positionClass: 'toast-top-right',
         progressBar: true,
         timeOut: 3000,
       });
       this.resetForm();
       this.uploadImage(this.studentId);
     },
     error: (error: any) => {
       this.handleError(error);
     },
   });
 }

 // Upload profile image
 private uploadImage(studentId: string): void {
   if (this.profileImage) {
     const formData = new FormData();
     formData.append('image', this.profileImage);

     this.studentService.addimage(studentId, formData).subscribe({
       complete: () => this.loadStudents(),
     });
   }
 }

 // Reset form and image data
 private resetForm(): void {
   this.profileForm.reset();
   this.profileImage = null;
   this.profileImageUrl = '';
   this.isUpdate = false;
 }

 // Patch data to the form for editing
 patchData(student: Student): void {
   this.profileImageUrl = student.imageUrl ?? '';
   this.profileForm.patchValue({
     nic: student.nic,
     firstName: student.firstName,
     lastName: student.lastName,
     dateOfBirth: new Date(student.dateOfBirth).toISOString().split('T')[0],
     gender: String(student.gender),
     phone: student.phone,
     address: student.address ?? {},
   });
   this.studentId = student.id;
   this.isUpdate = true;
 }

 // Open preview modal
 openPreviewModal(template: any, image: string): void {
   this.selectedImage = image;
   this.modalRef = this.modalService.show(template);
 }

 // Open confirmation modal for delete
 openDeleteModal(template: any, studentId: string): void {
   this.modalRef = this.modalService.show(template);
   this.deleteStudentId = studentId;
 }

 // Delete student by ID
 deleteStudent(): void {
   this.studentService.deleteStudent(this.deleteStudentId).subscribe({
     next: () => {
       this.toastr.success('Delete Successful', '', {
         positionClass: 'toast-top-right',
         progressBar: true,
         timeOut: 3000,
       });
       this.loadStudents();
     },
   });
   this.modalRef?.hide();
 }

 // Handle errors gracefully
 private handleError(error: any): void {
   this.toastr.warning(error.error, '', {
     positionClass: 'toast-top-right',
     progressBar: true,
     timeOut: 3000,
   });
 }
}
