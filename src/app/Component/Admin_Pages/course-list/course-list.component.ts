import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course, CourseCategory, Schedule } from '../../../Modals/modals';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CourseService } from '../../../Service/API/Course/course.service';
import { jwtDecode } from 'jwt-decode';
import { AuditlogService } from '../../../Service/API/AuditLog/auditlog.service';
import { AuditLogRequest } from '../student-list/student-list.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  providers: [BsModalService],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  CourseCategory:CourseCategory[]=[]

  //Pagination fields
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;
  currentLength:number = 0;
  totalItems:number = 0;

  //Form and Update status
  courseForm!: FormGroup;
  isUpdate:boolean = false

  // Course image variables
  selectedFile: File | null = null;
  courseImageUrl: string | null = null;
  
  // Modal-related variables
  modalRef?: BsModalRef;

  //Course ID for Update/delete operation
  private courseId:string=''
  
  loginData!:any

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private readonly auditLogService:AuditlogService
  ) {
    this.initializeForm();

    const token = localStorage.getItem("token");
    if(token != null){
      const decode:any =jwtDecode(token)
      this.loginData = decode
      console.log(this.loginData)
    }
  }

  ngOnInit(): void {
    this.loadItems(); 
    this.loadCategories();
  }

  private initializeForm(): void {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      courseCategoryId: ['', Validators.required],
      courseLevel: ['', Validators.required],
      courseFee: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      prerequisites: ['', Validators.maxLength(300)],
    });
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
      next: (response: Course) => {
          this.courseId=response.id
          this.toastr.success("Course added successfull" , "" , )
        this.loadItems();

        const auditLog:AuditLogRequest = {
          action: 'Add New Course',
          details: `Added a new Course with ID (${response.id})`,
          adminId: this.loginData.Id,
        }
        this.auditLogService.addAuditLog(auditLog).subscribe({
          next:()=>{},
          error: (error: any) => {
            console.error('Error adding audit log:', error.error);
          }
        })
      },
      complete:()=> {
        this.uploadImage();
        this.resetForm()
      },
      error:(error) =>{
        this.handleError(error);
      },
    })
  }

  private updateCourse(courseData:CourseRequest):void{
    this.courseService.updateCourse(this.courseId , courseData).subscribe({
      next:(response:Course)=>{
        this.toastr.success('Course updated successfull!', '', );
        this.loadItems();

        const auditLog:AuditLogRequest = {
          action: 'Update Course',
          details: `Updated course details for Course ID (${response.id})`,
          adminId: this.loginData.Id,
        }
        this.auditLogService.addAuditLog(auditLog).subscribe({
          next:()=>{},
          error: (error: any) => {
            console.error('Error adding audit log:', error.error);
          }
        })
      },
      complete:()=>{
        this.uploadImage();
      },
      error:(error:any)=>{
        this.handleError(error);
      }
    })
  }

  private uploadImage():void{
    if(this.selectedFile){
      const formdata= new FormData();
      formdata.append('image',this.selectedFile!);
      this.courseService.Addimage(this.courseId,formdata).subscribe({
        next:()=>{
          this.loadItems();
        },
        error:(error:any) =>{
          this.toastr.error('Image upload failed', '');
        }
      })
    }
  }

  editCourse(isEditMode:boolean):void{
    this.isUpdate = isEditMode;
    if(!isEditMode){
      this.resetForm()
    }
  }

  patchData(course:Course):void{
    this.courseImageUrl = course.imageUrl
    this.courseId = course.id
    this.courseForm.patchValue({
      courseName: course.courseName,
      courseCategoryId: course.courseCategoryId,
      courseLevel: course.level === "Beginner" ? "1": course.level === "Intermediate" ? "2": "3",
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
    this.courseService.deleteCourse(this.courseId).subscribe({
      next: () => {
        this.toastr.success('Deleted successfully!', '');
        this.loadItems();

        const auditLog:AuditLogRequest = {
          action: 'Delete Course',
          details: `Delete Course with ID (${this.courseId})`,
          adminId: this.loginData.Id,
        }
        this.auditLogService.addAuditLog(auditLog).subscribe({
          next:()=>{},
          error: (error: any) => {
            console.error('Error adding audit log:', error.error);
          }
        })
      },
      error: (error:any) => {
        this.handleError(error);
      },
    })
    this.modalRef?.hide()
  }

  private resetForm():void{
    this.courseForm.reset({
      courseLevel:'',
      courseCategoryId:''
    })
    this.resetImage();
    this.isUpdate = false
  }

  private resetImage():void{
    this.courseImageUrl = null;
    this.selectedFile = null;
  }

  private handleError(error: any): void {
    this.toastr.warning(error.error, '');
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
