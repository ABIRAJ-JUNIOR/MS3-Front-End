import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../../Service/Admin/admin.service';
import { Admin } from '../../../Modals/modals';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
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
  profileImageUrl: string | null = null;


  constructor(private adminService: AdminService,private fb: FormBuilder) {

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
        response.items.forEach((a:Admin) => {
          a.imagePath = "https://localhost:7044/" + a.imagePath
        })
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
  onSubmit() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      console.log('Form Data:', formData);
      alert('User details submitted successfully!');
      this.profileForm.reset(); // Reset form after successful submission
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }


}
