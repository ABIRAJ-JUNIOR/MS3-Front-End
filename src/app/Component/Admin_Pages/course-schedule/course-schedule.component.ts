import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentService } from '../../../Service/Student/student.service';
import { Router } from '@angular/router';
import { Schedule, Student } from '../../../Modals/modals';
import { CourseService } from '../../../Service/Course/course.service';

@Component({
  selector: 'app-course-schedule',
  standalone: true,
  imports: [CommonModule],
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

  constructor(private paginationService: CourseService) {}

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