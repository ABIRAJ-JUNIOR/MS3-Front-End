import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentService } from '../../../Service/Student/student.service';
import { Router } from '@angular/router';
import { Schedule, Student } from '../../../Modals/modals';
import { CourseService } from '../../../Service/Course/course.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-schedule',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './course-schedule.component.html',
  styleUrl: './course-schedule.component.css'
})
export class CourseScheduleComponent {
  schedules: Schedule[] = [];
  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 0;
  currentLength:number = 0;
  totalItems:number = 0;

  scheduleForm: FormGroup;
  courses: string[] = ['Web Development', 'Data Science', 'Design']; // Hardcoded course array

  constructor(private paginationService: CourseService,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.paginationService.schedulePagination(this.currentPage , this.pageSize).subscribe({
      next:((response:any) => {
        this.schedules = response.items
        this.totalPages = response.totalPages
        this.totalItems = response.totalItem
      }),
      complete:() => {
        this.currentLength = this.schedules.length
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
