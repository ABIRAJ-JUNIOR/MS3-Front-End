import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentService } from '../../../Service/Student/student.service';
import { Router } from '@angular/router';
import { Course, Schedule, Student } from '../../../Modals/modals';
import { CourseService } from '../../../Service/Course/course.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';

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
  currentPage: number = 1;    
  pageSize: number = 12;      
  totalPages: number = 0;     
  currentLength: number = 0;  
  totalItems: number = 0;     

  isUpdate:boolean = false
  private scheduleId:string = ""
  scheduleForm: FormGroup;    
  courses: DropDown[] = [];   

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    // Initialize the form with validators
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

  ngOnInit(): void {
    this.loadItems(); 
    this.loadCourses(); 
  }

  // Fetch paginated schedules
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

  // Fetch available courses for the dropdown
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

  // Add or update a schedule
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

  // Add a new Schedule
  private addSchedule(scheduleData:CourseScheduleRequest):void{
    this.courseService.addCourseSchedule(scheduleData).subscribe({
      next: () => {
        this.toastr.success('Schedule added successfull', '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 3000
        });
        this.scheduleForm.reset();
        this.loadItems();
      },
      error: (err: any) => {
        this.toastr.warning(err.error, '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 4000
        });
      }
    });
  }

  // Update an existing Schedule
  private updateSchedule(scheduleData:CourseScheduleRequest):void{
    this.courseService.updateCourseSchedule(this.scheduleId,scheduleData).subscribe({
      complete: () => {
        this.toastr.success('Updated successfull', '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 3000
        });
        this.loadItems();
      },
      error: (err:any) => {
        this.toastr.warning(err.error,'',{
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 4000
        })
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