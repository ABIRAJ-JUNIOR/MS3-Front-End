import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Service/Student/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../../Modals/modals';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
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

  constructor(private paginationService: StudentService , private router:Router) {}

  ngOnInit(): void {
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
}
