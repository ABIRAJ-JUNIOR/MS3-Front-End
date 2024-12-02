import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Student } from "../../../Modals/modals";
import { StudentService } from "../../../Service/API/Student/student.service";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { StudentcommonProfileComponent } from "../../common_components/studentcommon-profile/studentcommon-profile.component";

@Component({
  selector: 'app-student-setting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , StudentcommonProfileComponent],
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], 
      dateOfBirth: ['', Validators.required],
      gender: [0], 
      address: this.fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: ['Kindly provide your address for our records.'],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required]
      })
    });
    
  }


  StudentDetails: any;

  ngOnInit(): void {
    this.studentForm.disable();

    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();
    console.log(this.StudentTokenDetails)

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.StudentDetails = student
      this.assignStudentData();

    },
      (error) => {
        this.toastr.error("Failed to load student details. Please try again later.", "Error", {
          positionClass: "toast-top-right", 
          progressBar: true,
          timeOut: 4000,
          closeButton: true
       
        });
      },()=>{
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
      address: {
        addressLine1: studentData.address.addressLine1,
        addressLine2: studentData.address.addressLine2 || 'AddressLine2 Not included',  
        city: studentData.address.city,
        postalCode: studentData.address.postalCode,
        country: studentData.address.country
      }
    }
    console.log(student)
    this.StudentApiService.updateStudent(this.StudentTokenDetails.Id,student).subscribe(
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

      },()=>{

      }
    )
  }

  assignStudentData() {
    let Gender = 3;
    const genderValue = this.StudentDetails?.gender.toLowerCase();
    const dateOfBirth = new Date(this.StudentDetails?.dateOfBirth).toISOString().split('T')[0];


    if (genderValue == "male") {
      Gender = 1;
    } else if (genderValue == "female") {
      Gender = 2;
    }
    this.studentForm.setValue({
      firstName: this.StudentDetails.firstName,
      lastName: this.StudentDetails.lastName,
      phone: this.StudentDetails.phone,
      dateOfBirth: dateOfBirth,
      gender: Gender,
      address: this.StudentDetails.address || "Kindly provide your address for our records.",
    

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
  address:Address
}

interface Address {
  addressLine1: string;
  addressLine2?: string;  
  city: string;
  postalCode: string;
  country: string;
}
