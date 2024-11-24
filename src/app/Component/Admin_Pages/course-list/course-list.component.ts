import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {   CourseService } from '../../../Service/Course/course.service';
import { Course, CourseCategory, Schedule } from '../../../Modals/modals';
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

  CourseCategory:CourseCategory[]=[]

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

   // Handle course image selection
   onCourseImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.courseForm.patchValue({ courseImage: file });

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.courseImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  ngOnInit(): void {
    this.loadItems();
    this.courseService.GetAllCategory().subscribe({
      next: (data:CourseCategory[]) => {
        console.log(data)
        this.CourseCategory=data
    }})
  }

  loadItems(): void {
    this.courseService.pagination(this.currentPage , this.pageSize).subscribe({
      next:((response:any) => {
        this.totalPages = response.totalPages
        this.totalItems = response.totalItem
        response.items.forEach((a:Course) => {
          a.imageUrl = "https://localhost:7044/" + a.imageUrl
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

  onSubmit() {
    if (this.courseForm.valid) {
      const formData = new FormData();
      formData.append('courseName', this.courseForm.get('courseName')?.value);
      formData.append(
        'courseCategory',
        this.courseForm.get('courseCategory')?.value
      );
      formData.append('courseLevel', this.courseForm.get('courseLevel')?.value);
      formData.append('courseFee', this.courseForm.get('courseFee')?.value);
      formData.append(
        'description',
        this.courseForm.get('description')?.value
      );
      formData.append(
        'prerequisites',
        this.courseForm.get('prerequisites')?.value
      );

      // Handle image upload if it exists
      const courseImage = this.courseForm.get('courseImage')?.value;
      if (courseImage) {
        formData.append('courseImage', courseImage);
      }

      // Replace this console log with your API call to submit data
      console.log('Form data ready for submission:', formData);
      console.log(this.courseForm.value);
      
      alert('Course details submitted successfully!');

      // Clear the form (optional)
      this.courseForm.reset();
      this.courseImageUrl = null;
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
