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

  // Pagination
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;
  currentLength:number = 0;
  totalItems:number = 0;

  // Update or Add
  isUpdate:boolean = false;


  profileImage!:File;
  profileImageUrl: string  = "";
  selectedFile:File | null = null;

  // FormGroup
  profileForm!: FormGroup;
  constructor(private studentService: StudentService , private router:Router, private toastr:ToastrService,private fb: FormBuilder,private modalService: BsModalService) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
   
      nic: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/)]],
      confirmPassword: ['', Validators.required],
      address:this.fb.group({
        addressLine1: [''], 
        addressLine2: [''], 
        city: [''],
        postalCode: [''],
        country: [''] 
      })
    });
    this.loadItems();
  }

  loadItems(): void {
    this.studentService.pagination(this.currentPage , this.pageSize).subscribe({
      next:((response:any) => {
        this.students = response.items
        this.totalPages = response.totalPages
        this.totalItems = response.totalItem
      }),
      complete:() => {
        this.currentLength = this.students.length
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadItems();
    }
  }

  GoToReport(id:string){
    this.router.navigate(['/admin-dashboard/student-report' , id])
  }

  get formControls() {
    return this.profileForm.controls;
  }

  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.profileImage = file
    console.log(file)
    if (file) {
      this.previewImage(file);
    }
  }
  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profileImageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  private studentId:string=''
  onSubmit(): void {

    let form = this.profileForm.value
    for (let key in form) {
      if (form[key] === '') {
        form[key] = null;
      }
    }
    if(form.address.addressLine1 == null && form.address.addressLine2 == null && form.address.city == null && form.postalCode == null && form.country == null){
      form.address = null
    }
    form.gender=Number(form.gender)

    if(this.isUpdate == false){
      this.studentService.addStudent(form).subscribe({
      next:(response:any)=>{
        this.studentId=response.id
        this.toastr.success("Register Successfull" , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:3000
        })
        this.profileForm.reset();
        this.profileImageUrl = "";
        this.selectedFile = null;
      },
      complete:()=>{
        const formdata=new FormData();
        formdata.append('image',this.profileImage)
        this.studentService.addimage(this.studentId,formdata).subscribe({
          next:(response:any)=>{},
          complete:()=>{this.loadItems()},
        })
      },
      error:(error: any) => 
        {
          this.toastr.warning(error.error , "" , {
            positionClass:"toast-top-right",
            progressBar:true,
            timeOut:3000
          })
        }
      })
    }else{
      form.dateOfBirth = new Date(form.dateOfBirth)
      console.log(form.dateOfBirth)
      this.studentService.updateFullDetails(this.studentId,form).subscribe({
        next:(response:Student) => {
          this.toastr.success("Update Successfull" , "" , {
            positionClass:"toast-top-right",
            progressBar:true,
            timeOut:3000
          })
        this.profileForm.reset();
        this.loadItems();
        },
        complete:()=>{
          const formdata = new FormData();
          formdata.append('imageFile' , this.selectedFile!);
          this.studentService.addimage(this.studentId , formdata).subscribe({
            next:(response:any)=>{
              this.loadItems();
            }
          })
        },
        error:(error:any)=>{
          this.toastr.warning(error.error , "" , {
            positionClass:"toast-top-right",
            progressBar:true,
            timeOut:3000
          })
        }
      })
    }
  }

  editAdmin(number:Number){
    if(number == 1){
      this.profileImageUrl = "";
      this.selectedFile = null;
      this.profileForm.reset();
      this.isUpdate = false;
    }else if(number == 2){
      this.isUpdate = true;
    }
  }

  patchData(student:Student){
    console.log(new Date(student.dateOfBirth).toLocaleDateString('en-US'))
    this.profileImageUrl = student.imageUrl!
    this.profileForm.patchValue({
      nic:student.nic,
      firstName: student.firstName,
      lastName:student.lastName,
      dateOfBirth:new Date(student.dateOfBirth).toLocaleDateString(),
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
  }

  selectedImage: string | null = null;
  modalRef?: BsModalRef;

  openPreViewModal(template: any, image: string): void {
    this.selectedImage = image;
    this.modalRef = this.modalService.show(template);
  }

  private deleteStudentId:string = ''
  openModal(template: any , studentId:string): void {
    this.modalRef = this.modalService.show(template);
    this.deleteStudentId = studentId
  }

  deleteStudent(): void {
    this.studentService.deleteStudent(this.deleteStudentId).subscribe({
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
