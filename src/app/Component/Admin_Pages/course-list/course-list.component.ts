import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {   CourseService } from '../../../Service/Course/course.service';
import { Course, Schedule } from '../../../Modals/modals';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  courses: Course[] = [];
  currentPage: number = 1;
  pageSize: number = 13;
  totalPages: number = 0;
  currentLength:number = 0;
  totalItems:number = 0;

  courseForm: FormGroup;
  courseImageUrl: string | null = null; // To display the course image preview

  constructor(private courseService: CourseService,private fb: FormBuilder) {

    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      courseCategory: ['', Validators.required],
      courseLevel: ['', Validators.required],
      courseFee: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      prerequisites: ['', Validators.maxLength(300)],
      courseImage: [null], // For storing the file object
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.courseService.pagination(this.currentPage , this.pageSize).subscribe({
      next:((response:any) => {
        this.totalPages = response.totalPages
        this.totalItems = response.totalItem
        response.items.forEach((a:Course) => {
          a.imagePath = "https://localhost:7044/" + a.imagePath
          let count = 0
          a.schedules.forEach((s:Schedule) => {
            count++
          })
          a.schedulesCount = count;
        })
        this.courses = response.items
      }),
      complete:() => {
        this.currentLength = this.courses.length

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
