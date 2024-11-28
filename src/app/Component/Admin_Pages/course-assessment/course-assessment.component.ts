import { Component, afterNextRender } from '@angular/core';
import { Assessment, Course} from '../../../Modals/modals';
import { CourseService } from '../../../Service/Course/course.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-assessment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './course-assessment.component.html',
  styleUrl: './course-assessment.component.css'
})
export class CourseAssessmentComponent {
  assessments: Assessment[] = []; 
  courses: Course[] = [];
  currentPage: number = 1; 
  pageSize: number = 13; 
  totalPages: number = 0; 
  totalItems: number = 0; 
  currentLength: number = 0;

  assessmentForm!: FormGroup;

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.assessmentForm = this.fb.group({
      assessmentTitle: ['', Validators.required],
      courseId: ['', Validators.required],
      assessmentType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      totalMarks: ['', Validators.required],
      passMarks: ['', Validators.required],
      assessmentLink: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadItems(); 
    this.loadCourses();
  }

  loadItems(): void {
    this.courseService.assessmentPagination(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.assessments = response.items;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItem; 
      },
      complete: () => {
        this.currentLength = this.assessments.length; 
      }
    });
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page; 
      this.loadItems();
    }
  }

  onSubmit(): void {
    if (this.assessmentForm.valid) {
      const formData = this.assessmentForm.value;

      const assessment: AssessmentRequest = {
        courseId: formData.courseId,
        assessmentType: Number(formData.assessmentType), 
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalMarks: formData.totalMarks,
        passMarks: formData.passMarks
      };

      this.courseService.addAssessment(assessment).subscribe({
        next: (response: any) => {
          this.toastr.success('Assessment added successfully', '', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut: 3000
          });
          this.assessmentForm.reset();
          this.loadItems(); 
        },
        error: (err: any) => {
          this.toastr.warning(err.error, '', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut: 3000
          });
        }
      });
    } else {
      this.toastr.warning('Please fill out all required fields correctly', '', {
        positionClass: 'toast-top-right',
        progressBar: true,
        timeOut: 3000
      });
    }
  }

  
}

export interface AssessmentRequest{
  courseId:string;
  assessmentType:Number;
  startDate:string;
  endDate:string;
  totalMarks:Number;
  passMarks:Number;
} 
