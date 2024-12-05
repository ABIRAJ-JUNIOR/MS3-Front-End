import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Schedule } from '../../../Modals/modals';
import { CourseService } from '../../../Service/API/Course/course.service';
import { jwtDecode } from 'jwt-decode';
import { AuditlogService } from '../../../Service/API/AuditLog/auditlog.service';
import { AuditLogRequest } from '../student-list/student-list.component';

@Component({
  selector: 'app-course-schedule',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,BsDatepickerModule],
  providers: [BsModalService],
  templateUrl: './course-schedule.component.html',
  styleUrl: './course-schedule.component.css'
})
export class CourseScheduleComponent {
  schedules: Schedule[] = []; 
  courses: DropDown[] = [];   

  currentPage: number = 1;    
  pageSize: number = 12;      
  totalPages: number = 0;     
  currentLength: number = 0;  
  totalItems: number = 0;     

  isUpdate:boolean = false
  private scheduleId:string = ""
  scheduleForm!: FormGroup;    

  loginData!:any

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private toastr: ToastrService,
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
    this.loadCourses(); 
  }

  private initializeForm(): void {
    this.scheduleForm = this.fb.group({
      courseId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      maxStudents: ['', [Validators.required, Validators.min(1)]],
      scheduleStatus: ['', Validators.required],
    });
  }

  loadItems(): void {
    this.courseService.schedulePagination(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.schedules = response.items;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItem;
      },
      complete: () => {
        this.currentLength = this.schedules.length;
      }
    });
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data: any) => {
        this.courses = data.map((course: any) => ({
          id: course.id,
          name: course.courseName
        }));
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadItems();
    }
  }

  onSubmit(): void {
    if (this.scheduleForm.valid) {
      const formData = this.scheduleForm.value;

      formData.scheduleStatus = Number(formData.scheduleStatus);

      const scheduleDetails: CourseScheduleRequest = {
        courseId: formData.courseId,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        time: formData.time,
        location: formData.location,
        maxStudents: formData.maxStudents,
        scheduleStatus: formData.scheduleStatus,
      };

      if(this.isUpdate){
        this.updateSchedule(scheduleDetails);
      }else{
        this.addSchedule(scheduleDetails)
      }

    }
  }

  private addSchedule(scheduleData:CourseScheduleRequest):void{
    this.courseService.addCourseSchedule(scheduleData).subscribe({
      next: (response:Schedule) => {
        this.toastr.success('Schedule added successfull', '');
        this.scheduleForm.reset();
        this.loadItems();
        
        const auditLog:AuditLogRequest = {
          action: 'Add Schedule',
          details: `Added a new schedule for Course ID (${response.id}). The schedule starts on ${new Date(response.startDate).toDateString()} and ends on ${new Date(response.endDate).toDateString()}.`,
          adminId: this.loginData.Id,
        }
        this.auditLogService.addAuditLog(auditLog).subscribe({
          next:()=>{},
          error: (error: any) => {
            console.error('Error adding audit log:', error.error);
          }
        })
      },
      error: (err: any) => {
        this.toastr.warning(err.error, '');
      }
    });
  }

  private updateSchedule(scheduleData:CourseScheduleRequest):void{
    this.courseService.updateCourseSchedule(this.scheduleId,scheduleData).subscribe({
      next:(response:Schedule)=>{
        this.toastr.success('Updated successfull', '');

        this.loadItems();

        const auditLog:AuditLogRequest = {
          action: 'Update Schedule',
          details: `Updated schedule for Course ID (${response.id})`,
          adminId: this.loginData.Id,
        }
        this.auditLogService.addAuditLog(auditLog).subscribe({
          next:()=>{},
          error: (error: any) => {
            console.error('Error adding audit log:', error.error);
          }
        })
      },
      error: (err:any) => {
        this.toastr.warning(err.error,'')
      }
    })
  }

  editSchedule(isEditMode:boolean):void{
    this.isUpdate = isEditMode;
  }

  patchData(scheduleData:Schedule):void{
    this.scheduleId = scheduleData.id
    this.scheduleForm.patchValue({
      courseId:scheduleData.courseResponse.id,
      startDate:new Date(scheduleData.startDate).toLocaleString(),
      endDate:new Date(scheduleData.endDate).toLocaleString(),
      time:scheduleData.time,
      location:scheduleData.location,
      maxStudents:scheduleData.maxStudents,
      scheduleStatus:scheduleData.scheduleStatus === "Open" ? "1": scheduleData.scheduleStatus === "Closed" ? "2": "3",

    });
    this.isUpdate = true
  }

}

export interface DropDown{
  name:string;
  id:string;
}

export interface CourseScheduleRequest{
  courseId:string;
  startDate:Date;
  endDate:Date;
  time:string
  location:string;
  maxStudents:number;
  scheduleStatus: number;
}