import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Service/Student/student.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../../Modals/modals';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,BsDatepickerModule],
  providers: [BsModalService],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  studentId: string = '';
  private deleteStudentId:string = ''
  selectedImage: string | null = null;
  modalRef?: BsModalRef;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;
  currentLength:number = 0;
  totalItems:number = 0;

  // Update or Add
  isUpdate:boolean = false;

 // Form and File Handling
  profileForm!: FormGroup;
  profileImage!:File;
  profileImageUrl: string | null = "";
  selectedFile:File | null = null;



  constructor(
    private readonly studentService: StudentService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly fb: FormBuilder,
    private readonly modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.initializeForm()
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
      complete:() => {
      this.currentLength = this.students.length
    }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadStudents();
    }
  }

  // Navigate to the student report page  
  GoToReport(id:string){
    this.router.navigate(['/admin-dashboard/student-report' , id])
  }

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
  public addStudent(formData: any): void {
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
  public updateStudent(formData: any): void {
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
    // this.profileImage = null;
    this.profileImageUrl = '';
    this.isUpdate = false;
  }

  // Patch data to the form for editing
  patchData(student: Student): void {
    this.profileImageUrl = student.imageUrl ?? '';
    this.profileForm.patchValue({
      nic:student.nic,
      firstName: student.firstName,
      lastName:student.lastName,
      dateOfBirth: new Date(student.dateOfBirth).toISOString().split('T')[0],
      gender:1,
      phone:student.phone,
      address:{
        addressLine1:student.address != null ? student.address.addressLine1 : null,
        addressLine2:student.address != null ? student.address.addressLine2 : null,
        city:student.address != null ? student.address.city : null,
        postalCode:student.address != null ? student.address.postalCode : null,
        country:student.address != null ? student.address.country : null,
      }
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

  // onSubmit(): void {

  //   let form = this.profileForm.value
  //   for (let key in form) {
  //     if (form[key] === '') {
  //       form[key] = null;
  //     }
  //   }
  //   if(form.address.addressLine1 == null && form.address.addressLine2 == null && form.address.city == null && form.postalCode == null && form.country == null){
  //     form.address = null
  //   }
  //   form.gender=Number(form.gender)

  //   if(this.isUpdate == false){
  //     this.studentService.addStudent(form).subscribe({
  //     next:(response:any)=>{
  //       this.studentId=response.id
  //       this.toastr.success("Register Successfull" , "" , {
  //         positionClass:"toast-top-right",
  //         progressBar:true,
  //         timeOut:3000
  //       })
  //       this.profileForm.reset();
  //       this.profileImageUrl = "";
  //       this.selectedFile = null;
  //     },
  //     complete:()=>{
  //       const formdata=new FormData();
  //       formdata.append('image',this.profileImage)
  //       this.studentService.addimage(this.studentId,formdata).subscribe({
  //         next:(response:any)=>{},
  //         complete:()=>{this.loadStudents()},
  //       })
  //     },
  //     error:(error: any) => 
  //       {
  //         this.toastr.warning(error.error , "" , {
  //           positionClass:"toast-top-right",
  //           progressBar:true,
  //           timeOut:3000
  //         })
  //       }
  //     })
  //   }else{
  //     form.dateOfBirth = new Date(form.dateOfBirth)
  //     this.studentService.updateFullDetails(this.studentId,form).subscribe({
  //       next:(response:Student) => {
  //         this.toastr.success("Update Successfull" , "" , {
  //           positionClass:"toast-top-right",
  //           progressBar:true,
  //           timeOut:3000
  //         })
  //       this.profileForm.reset();
  //       this.loadStudents();
  //       },
  //       complete:()=>{
  //         const formdata = new FormData();
  //         formdata.append('imageFile' , this.selectedFile!);
  //         this.studentService.addimage(this.studentId , formdata).subscribe({
  //           next:(response:any)=>{
  //             this.loadStudents();
  //           }
  //         })
  //         this.profileImageUrl = null;
  //         this.selectedFile = null;
  //       },
  //       error:(error:any)=>{
  //         this.toastr.warning(error.error , "" , {
  //           positionClass:"toast-top-right",
  //           progressBar:true,
  //           timeOut:3000
  //         })
  //       }
  //     })
  //   }
  // }

  // editAdmin(number:Number){
  //   if(number == 1){
  //     this.profileImageUrl = "";
  //     this.selectedFile = null;
  //     this.profileForm.reset();
  //     this.isUpdate = false;
  //   }else if(number == 2){
  //     this.isUpdate = true;
  //   }
  // }

  // patchData(student:Student){
  //   this.profileImageUrl = student.imageUrl!
  //   this.profileForm.patchValue({
  //     nic:student.nic,
  //     firstName: student.firstName,
  //     lastName:student.lastName,
  //     dateOfBirth: new Date(student.dateOfBirth).toISOString().split('T')[0],
  //     gender:1,
  //     phone:student.phone,
  //     address:{
  //       addressLine1:student.address != null ? student.address.addressLine1 : null,
  //       addressLine2:student.address != null ? student.address.addressLine2 : null,
  //       city:student.address != null ? student.address.city : null,
  //       postalCode:student.address != null ? student.address.postalCode : null,
  //       country:student.address != null ? student.address.country : null,
  //     }
  //   });
  //   this.studentId = student.id;
  // }

  // openPreViewModal(template: any, image: string): void {
  //   this.selectedImage = image;
  //   this.modalRef = this.modalService.show(template);
  // }


  // openModal(template: any , studentId:string): void {
  //   this.modalRef = this.modalService.show(template);
  //   this.deleteStudentId = studentId
  // }

  // deleteStudent(): void {
  //   this.studentService.deleteStudent(this.deleteStudentId).subscribe({
  //     next: (response: any) => {
  //       this.toastr.success("Delete Successfull" , "" , {
  //         positionClass:"toast-top-right",
  //         progressBar:true,
  //         timeOut:3000
  //       })
  //     },
  //     complete:()=>{
  //       this.loadStudents();
  //     }
  //   })
  //   this.modalRef?.hide();
  // }

}

export interface StudentReqest{
  nic:string;
  firstName:string;
  lastName:string;
  dateOfBirth:string;
  gender:number;
  phone:string;
  email:string;
  password:string;
  address?:AddressRequest;
}

export interface AddressRequest {
  addressLine1:string;
  addressLine2:string;
  city:string;
  postalCode:string;
  country:string;
}
