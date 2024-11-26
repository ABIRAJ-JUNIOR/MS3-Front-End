import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentDashDataServiceService } from '../../../Service/Student/student-dash-data-service.service';
import { Student } from '../../../Modals/modals';
import { StudentService } from '../../../Service/Student/student.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-setting',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  templateUrl: './student-setting.component.html',
  styleUrl: './student-setting.component.css'
})
export class StudentSettingComponent implements OnInit {


  IsEditMode: boolean = false;
  StudentTokenDetails: any;
  studentForm:FormGroup;

  constructor(private StudentDashDataService: StudentDashDataServiceService, private StudentApiService: StudentService ,private fb : FormBuilder) {

  }


  StudentDetails: any;
  ngOnInit(): void {
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.StudentDetails = student

    }
      ,
      (error) => {
      })

  }


  changeEditMode() {
    this.IsEditMode = !this.IsEditMode
  }


}
