import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentDashDataServiceService } from '../../../Service/Student/student-dash-data-service.service';
import { Student } from '../../../Modals/modals';
import { StudentService } from '../../../Service/Student/student.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-setting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-setting.component.html',
  styleUrl: './student-setting.component.css'
})
export class StudentSettingComponent implements OnInit {


  IsEditMode: boolean = false;
  StudentTokenDetails: any;
  studentForm: FormGroup;

  constructor(private StudentDashDataService: StudentDashDataServiceService, private StudentApiService: StudentService, private fb: FormBuilder) {

    this.studentForm = this.fb.group({
      firstName: ['Anojan'],
      lastName: ['anoj'],
      phone: ['+1 234 567 890'],
      address: ['1234 Main St, City, Country'],
      dateOfBirth: ['2004/09/30'],
      gender: ['male'] // Initialize gender field
    });
  }


  StudentDetails: any;
  ngOnInit(): void {
    this.studentForm.disable();
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.StudentDetails = student
      this.assignStudentData();

    }
      ,
      (error) => {
      })

  }

  assignStudentData() {
    this.studentForm.setValue({
      firstName: this.StudentDetails.firstName,
      lastName: this.StudentDetails.lastName,
      phone: this.StudentDetails.phone,
      address: this.StudentDetails.address,
      dateOfBirth: this.StudentDetails.dateOfBirth,
      gender: this.StudentDetails.gender
    });
  }


  changeEditMode() {
    this.IsEditMode = !this.IsEditMode

    if (this.IsEditMode) {
      this.studentForm.enable();
    } else {
      this.studentForm.disable();
    }
  }


}
