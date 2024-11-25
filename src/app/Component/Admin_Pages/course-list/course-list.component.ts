import { Component, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import {   CourseService } from '../../../Service/Course/course.service';
import { Course, CourseCategory, Schedule } from '../../../Modals/modals';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  profileImage!:File;

  courseForm: FormGroup;
  courseImageUrl: string | null = null; // To display the course image preview

  CourseCategory:CourseCategory[]=[]

  constructor(private courseService: CourseService,private fb: FormBuilder, private toastr:ToastrService) {

    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      courseCategoryId: ['', Validators.required],
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
      this.profileImage=file
      
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
private CourseId:string=''
  onSubmit() {
    if (this.courseForm.valid) {
    const form=this.courseForm.value
    console.log(form);
    
    form.courseLevel=Number(form.courseLevel)
      // Replace this console log with your API call to submit data
      // console.log('Form data ready for submission:', formData);
      console.log(this.profileImage);
      const coursedata:CourseRequest={
        courseCategoryId:form.courseCategoryId,
        courseName:form.courseName,
        level:form.level,
        courseFee:form.courseFee,
        description:form.description,
        prerequisites:form.prerequisites
      }
      alert('Course details submitted successfully!');
        this.courseService.AddCourse(coursedata).subscribe({
          next: (response: any) => {
              this.CourseId=response.id
              
              this.toastr.success("Added Successfull" , "" , {
                positionClass:"toast-top-right",
                progressBar:true,
                timeOut:3000
              })
          },
          complete:()=> {
            const formdata= new FormData();
            formdata.append('image',this.profileImage);
            this.courseService.Addimage(this.CourseId,formdata).subscribe({
              next:(response:any)=>{}
            })
          },
          error:(err) =>{
            this.toastr.warning(err.error , "" , {
              positionClass:"toast-top-right",
              progressBar:true,
              timeOut:3000
            })
          },
        })
      // Clear the form (optional)
      this.courseForm.reset();
      this.courseImageUrl = null;
    } else {
      alert('Please fill out all required fields.');
    }
  }
}


export interface CourseRequest{
  courseCategoryId:string;
  courseName:string;
  level:Number;
  courseFee:Number;
  description:string;
  prerequisites:string;
}
