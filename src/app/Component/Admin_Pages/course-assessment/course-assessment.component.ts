import { Component } from '@angular/core';
import { Assessment, Course, Schedule } from '../../../Modals/modals';
import { CourseService } from '../../../Service/Course/course.service';
import { CommonModule } from '@angular/common';
import { REACTIVE_NODE } from '@angular/core/primitives/signals';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-assessment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './course-assessment.component.html',
  styleUrl: './course-assessment.component.css'
})
export class CourseAssessmentComponent {
  assessments: Assessment[] = [];
  currentPage: number = 1;
  pageSize: number = 13;
  totalPages: number = 0;
  currentLength:number = 0;
  totalItems:number = 0;
  assessmentForm!: FormGroup;

  constructor(private courseService: CourseService,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.courseService.assessmentPagination(this.currentPage , this.pageSize).subscribe({
      next:((response:any) => {
        this.assessments = response.items
        this.totalPages = response.totalPages
        this.totalItems = response.totalItem
      }),
      complete:() => {
        this.currentLength = this.assessments.length

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
