import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {   CourseService } from '../../../Service/Course/course.service';
import { Course, CourseCategory, Schedule } from '../../../Modals/modals';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  CourseCategory:CourseCategory[]=[]

  //Pagination fields
  currentPage: number = 1;
  pageSize: number = 13;
  totalPages: number = 0;
  currentLength:number = 0;
  totalItems:number = 0;

  //Form and Update status
  courseForm: FormGroup;
  isUpdate:boolean = false

  // Course image variables
  selectedFile: File | null = null;
  courseImageUrl: string | null = null;
  
  // Modal-related variables
  modalRef?: BsModalRef;

  //Course ID for Update/delete operation
  private courseId:string=''
  

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {
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
    this.loadItems(); 
    this.loadCategories();
  }

  private loadItems(): void {
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

  private loadCategories():void{
    this.courseService.GetAllCategory().subscribe({
      next: (data:CourseCategory[]) => {
        this.CourseCategory=data
    }})
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadItems();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile=file
      const reader = new FileReader();

      reader.onload = () => {
        this.courseImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const form = this.courseForm.value
      
      form.courseLevel=Number(form.courseLevel)
      const coursedata:CourseRequest={
        courseCategoryId:form.courseCategoryId,
        courseName:form.courseName,
        level:form.courseLevel,
        courseFee:form.courseFee,
        description:form.description,
        prerequisites:form.prerequisites
      }

      if(!this.isUpdate){
        this.addCourse(coursedata);
      }else{
        this.updateCourse(coursedata);
      }
    }
  }

  private addCourse(courseData:CourseRequest):void{
    this.courseService.AddCourse(courseData).subscribe({
      next: (response: any) => {
          this.courseId=response.id
          this.toastr.success("Course added successfull" , "" , {
            positionClass:"toast-top-right",
            progressBar:true,
            timeOut:3000
          })
        this.loadItems();
      },
      complete:()=> {
        this.uploadImage();
      },
      error:(error) =>{
        this.toastr.warning(error.error , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        })
      },
    })
  }

  private updateCourse(courseData:CourseRequest):void{
    this.courseService.updateCourse(this.courseId , courseData).subscribe({
      next:()=>{
        this.toastr.success('Course updated successfull!', '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut:3000
        });
        this.loadItems();
      },
      complete:()=>{
        this.uploadImage();
      },
      error:(error:any)=>{
        this.toastr.error(error.error, '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut:4000
        });
      }
    })
  }

  private uploadImage():void{
    if(this.selectedFile){
      const formdata= new FormData();
      formdata.append('image',this.selectedFile!);
      this.courseService.Addimage(this.courseId,formdata).subscribe({
        complete:()=>{
        this.loadItems();
        },
        error:(error:any) =>{
          this.toastr.error('Image upload failed', '', {
            positionClass: 'toast-top-right',
          });
        }
      })
    }
  }

  editCourse(isEditMode:boolean):void{
    this.isUpdate = isEditMode;
  }

  patchData(course:Course):void{
    this.courseImageUrl = course.imageUrl
    this.courseId = course.id
    this.courseForm.patchValue({
      courseName: course.courseName,
      courseCategoryId: course.courseCategoryId,
      courseLevel: course.level,
      courseFee: course.courseFee,
      description:course.description,
      prerequisites:course.prerequisites,
    })
  }

  openPreviewModal(template: any, image: string): void {
    this.courseImageUrl = image;
    this.modalRef = this.modalService.show(template);
  }

  openDeleteModal(template: any, courseId: string): void {
    this.modalRef = this.modalService.show(template);
    this.courseId = courseId;
  }

  deleteCourse():void{
    
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
