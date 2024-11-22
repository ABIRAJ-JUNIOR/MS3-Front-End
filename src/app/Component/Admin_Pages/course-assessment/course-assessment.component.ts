import { Component } from '@angular/core';
import { Assessment, Course, Schedule } from '../../../Modals/modals';
import { CourseService } from '../../../Service/Course/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-assessment',
  standalone: true,
  imports: [CommonModule],
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


  constructor(private courseService: CourseService) {}

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
