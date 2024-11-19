import { Component, OnInit } from '@angular/core';
import { Student, StudentService } from '../../../Service/Student/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  currentPage: number = 1;
  pageSize: number = 13;
  totalPages: number = 0;
  currentLength:number = 0;
  totalItems:number = 0;

  gender = Object.values(Gender);

  constructor(private paginationService: StudentService) {}

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
}

export enum Gender{
  Male = 1,
  Female = 2,
  More =3
}
