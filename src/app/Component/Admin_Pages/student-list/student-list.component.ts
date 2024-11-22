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
      let formData=this.profileForm.value
      for (let key in formData) {
        if (formData[key] === '') {
          formData[key] = null;
        }
      }
      console.log('Form Submitted', this.profileForm.value);
    }
    this.profileForm.reset()
  }
}
