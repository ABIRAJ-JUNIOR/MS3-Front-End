import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CourseRequest } from "../Component/Admin_Pages/course-list/course-list.component";
import { Course, CourseCategory } from "../Modals/modals";
import { CourseService } from "../Service/Course/course.service";


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  courses: Course[] = []; // List of courses
  currentPage: number = 1; // Current page number
  pageSize: number = 13; // Number of items per page
  totalPages: number = 0; // Total number of pages
  currentLength: number = 0; // Current number of items on the page
  totalItems: number = 0; // Total number of items
  profileImage!: File; // File object for the course image

  courseForm: FormGroup; // FormGroup for course form
  courseImageUrl: string | null = null; // Preview URL for the selected course image

  CourseCategory: CourseCategory[] = []; // List of course categories
  private CourseId: string = ''; // Holds the ID of the newly created course

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    // Initialize the form with validation rules
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      courseCategoryId: ['', Validators.required],
      courseLevel: ['', Validators.required],
      courseFee: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      prerequisites: ['', Validators.maxLength(300)],
    });
  }

  ngOnInit(): void {
    this.loadItems(); // Load paginated courses
    this.loadCategories(); // Load course categories
  }

  // Fetch paginated courses
  loadItems(): void {
    this.courseService.pagination(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItem;

        // Calculate schedules count for each course
        response.items.forEach((course: Course) => {
          course.schedulesCount = course.schedules.length;
        });
        this.courses = response.items;
      },
      complete: () => {
        this.currentLength = this.courses.length;
      }
    });
  }

  // Fetch course categories for the dropdown
  loadCategories(): void {
    this.courseService.GetAllCategory().subscribe({
      next: (categories: CourseCategory[]) => {
        this.CourseCategory = categories;
      }
    });
  }

  // Handle pagination navigation
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadItems();
    }
  }

  // Handle course image selection
  onCourseImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.profileImage = file;

      this.courseForm.patchValue({ courseImage: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.courseImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;

      // Prepare the course request payload
      const courseData: CourseRequest = {
        courseCategoryId: formData.courseCategoryId,
        courseName: formData.courseName,
        level: Number(formData.courseLevel),
        courseFee: formData.courseFee,
        description: formData.description,
        prerequisites: formData.prerequisites
      };

      // Add the course
      this.courseService.AddCourse(courseData).subscribe({
        next: (response: any) => {
          this.CourseId = response.id; // Save the course ID for the image upload
          this.toastr.success('Course added successfully', '', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut: 3000
          });
        },
        complete: () => {
          // Upload the course image
          if (this.profileImage) {
            const formData = new FormData();
            formData.append('image', this.profileImage);
            this.courseService.Addimage(this.CourseId, formData).subscribe();
          }
          this.courseImageUrl = null; // Clear the preview
          this.courseForm.reset(); // Reset the form
        },
        error: (err: any) => {
          this.toastr.warning(err.error, '', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut: 3000
          });
        }
      });
    }
  }
}
  

