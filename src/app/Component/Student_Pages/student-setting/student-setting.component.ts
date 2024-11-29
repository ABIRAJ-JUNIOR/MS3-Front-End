import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Student } from '../../../Modals/modals';
import { StudentService } from '../../../Service/API/Student/student.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentDashDataService } from '../../../Service/Data/Student_Data/student-dash-data.service';

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
  
  NoImage: string = "https://cdn-icons-png.flaticon.com/512/9193/9193906.png"

  constructor(private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService, private fb: FormBuilder, private toastr: ToastrService) {

    this.studentForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phone: [''],
      address: [''],
      dateOfBirth: [''],
      gender: [0]
    });
  }


  StudentDetails: any;

  ngOnInit(): void {
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();
    console.log(this.StudentTokenDetails)

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.StudentDetails = student
      this.assignStudentData();
      this.studentForm.disable();

    },
      (error) => {
        this.toastr.error("Failed to load student details. Please try again later.", "Error", {
          positionClass: "toast-top-right", 
          progressBar: true,
          timeOut: 4000,
          closeButton: true
       
        });
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
      id: this.StudentTokenDetails.Id
    }
    console.log(student)
    this.StudentApiService.updateStudent(student).subscribe(
      (data: any) => {
        this.toastr.success("User Update Successfull", "", {
          progressBar: true,
          timeOut: 4000,
          positionClass: 'toast-bottom-right' 
        })
        this.studentForm.disable()
        this.IsEditMode = !this.IsEditMode
      },
      (error) => {
        this.toastr.error("User Update Failed try again later", "", {
          progressBar: true,
          timeOut: 4000,
          positionClass: 'toast-bottom-right'
        })

      }
    )
  }

  assignStudentData() {
    let gender = 3;

    const genderValue = this.StudentDetails.gender.toLowerCase();

    if (genderValue === "male") {
      gender = 1;
    } else if (genderValue === "female") {
      gender = 2;
    }

    this.studentForm.setValue({
      firstName: this.StudentDetails.firstName,
      lastName: this.StudentDetails.lastName,
      phone: this.StudentDetails.phone,
      address: this.StudentDetails.address || "Address Field Is Soon",
      dateOfBirth: this.StudentDetails.dateOfBirth,
      gender: gender

    });
  }


  changeEditMode() {
    this.IsEditMode = !this.IsEditMode

    if (this.IsEditMode) {
      this.studentForm.enable();
      this.toastr.success("Profile Edit Mode Activated", "", {
        progressBar: true,
        timeOut: 4000,
        positionClass: 'toast-bottom-right'
      })
    } else {
      this.studentForm.disable();
      this.toastr.success("Your profile is now in view-only mode.", "", {
        progressBar: true,
        timeOut: 4000,
        positionClass: 'toast-bottom-right'
      })
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