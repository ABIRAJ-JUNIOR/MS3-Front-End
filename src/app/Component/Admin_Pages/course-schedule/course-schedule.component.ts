import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentService } from '../../../Service/Student/student.service';
import { Router } from '@angular/router';
import { Course, Schedule, Student } from '../../../Modals/modals';
import { CourseService } from '../../../Service/Course/course.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  courses: DropDown[] = []

  constructor(private courseService: CourseService,private fb: FormBuilder) {
    this.scheduleForm = this.fb.group({
      course: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      time: ['', [Validators.required, Validators.required]],
      location: ['', Validators.required],
      maxStudents: ['', [Validators.required, Validators.min(1)]],
      scheduleStatus: ['', Validators.required],
    });


  }

  ngOnInit(): void {
    this.loadItems();
    this.courseService.getCourses().subscribe({
      next: (data:Course[]) => {
        console.log(data)
        data.forEach(c => {
          const course = {
            name:c.courseName,
            id:c.id
          }
          this.courses.push(course)
        })
      }
    })
  }

  loadItems(): void {
    this.courseService.schedulePagination(this.currentPage , this.pageSize).subscribe({
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

  onSubmit() {
    if (this.scheduleForm.valid) {
      const scheduleData = this.scheduleForm.value;
      scheduleData.scheduleStatus = Number(scheduleData.scheduleStatus)
      this.courseService.addCourseSchedule(scheduleData).subscribe({})
      console.log('Course Schedule Data:', scheduleData);
      // Implement further actions, e.g., API call or storing data.
    }
  }
}

export interface DropDown{
  name:string;
  id:string;
}