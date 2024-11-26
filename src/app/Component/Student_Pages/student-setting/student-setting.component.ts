import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentDashDataServiceService } from '../../../Service/Student/student-dash-data-service.service';
import { Student } from '../../../Modals/modals';
import { StudentService } from '../../../Service/Student/student.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private StudentDashDataService: StudentDashDataServiceService, private StudentApiService: StudentService, private fb: FormBuilder, private toastr: ToastrService) {

    this.studentForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phone: [''],
      address: [''],
      dateOfBirth: [''],
      gender: [1]
    });
  }


  StudentDetails: any;
  ngOnInit(): void {
    this.studentForm.disable();
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();
    console.log(this.StudentTokenDetails)

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.StudentDetails = student
      console.log(this.StudentDetails)
      this.assignStudentData();

    },
      (error) => {
        alert("Error")
      })

  }


  onSubmit() {
    const studentData = this.studentForm.value;
    const student: StudenUpdateRequest = {
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      dateOfBirth: studentData.dateOfBirth,
      gender: Number(studentData.gender),
      phone: studentData.phone,
      id: this.StudentTokenDetails.Id,
      address: studentData.address
    }
    console.log(student)
    this.StudentApiService.updateStudent(student).subscribe(
      (data: any) => {
        this.toastr.success("User SignUp Successfull", "", {
          positionClass: "toast-top-right",
          progressBar: true,
          timeOut: 3000
        })
      },
      (error) => {
        alert(error)

      }
    )
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

export interface StudenUpdateRequest {
  firstName: string;
  lastName?: string;
  dateOfBirth: string;
  gender: number;
  phone: string;
  address?: string;
  id: string;
}