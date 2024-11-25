import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Service/Student/student.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../../Modals/modals';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,BsDatepickerModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 0;
  currentLength:number = 0;
  totalItems:number = 0;

  profileImage!:File;
  profileForm!: FormGroup;
  constructor(private paginationService: StudentService , private router:Router,private fb: FormBuilder) {}

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
      addressLine1: [''], 
      addressLine2: [''], 
      city: [''],
      postalCode: [''],
      country: [''] 
    });
    this.loadItems();

    
  }

  loadItems(): void {
    this.paginationService.pagination(this.currentPage , this.pageSize).subscribe({
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

  onSubmit(): void {
    if (this.profileForm.valid) {
      let form=this.profileForm.value
      for (let key in form) {
        if (form[key] === '') {
          form[key] = null;
        }
      }
      form.gender=Number(form.gender)
      const Studentdata:Student={}
    //   const gender:number = Number(form.gender)
    // const formdata:FormData = new FormData();
    // formdata.append('nic',form.nic),
    // formdata.append('firstName',form.firstName),
    // formdata.append('lastName',form.lastName),
    // formdata.append('dateOfBirth',form.dateOfBirth),
    // formdata.append('gender',form.gender),
    // formdata.append('email',form.email),
    // formdata.append('phone',form.phone),
    // formdata.append('password',form.password),
    // formdata.append('address.addressLine1',form.nic),
    // formdata.append('address.addressLine2',form.nic),
    // formdata.append('address.city',form.nic),
    // formdata.append('address.postalCode',form.nic),
    // formdata.append('address.country',form.nic),
    


    this.paginationService.addStudent(formdata).subscribe(data=>{
      console.log(data)
    })

      console.log('Form Submitted', this.profileForm.value);
    }
    this.profileForm.reset()
  }
  get formControls() {
    return this.profileForm.controls;
  }

  profileImageUrl: string | undefined;
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
  address:AddressRequest;
}

export interface AddressRequest {
  addressLine1:string;
  addressLine2:string;
  city:string;
  postalCode:string;
  country:string;
}
