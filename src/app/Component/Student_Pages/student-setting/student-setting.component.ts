import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Student } from "../../../Modals/modals";
import { StudentService } from "../../../Service/API/Student/student.service";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { StudentcommonProfileComponent } from "../../common_components/studentcommon-profile/studentcommon-profile.component";
import { passwordValidator } from "../../Admin_Pages/account-setting/account-setting.component";
import { AuthService } from "../../../Service/API/Auth/auth.service";

@Component({
  selector: 'app-student-setting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StudentcommonProfileComponent],
  templateUrl: './student-setting.component.html',
  styleUrl: './student-setting.component.css'
})
export class StudentSettingComponent implements OnInit {


  IsEditMode: boolean = false;
  StudentTokenDetails: any;
  studentForm: FormGroup;

  changePass: FormGroup;

  NoImage: string = "https://cdn-icons-png.flaticon.com/512/9193/9193906.png"

  constructor(private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService, private fb: FormBuilder, private toastr: ToastrService ,private authService:AuthService) {


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


    this.changePass = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required,passwordValidator()]],
      confirmPassword: ['', [Validators.required]]
    })

  }
  dataHtml: string = ""

  StudentDetails: any;

  ngOnInit(): void {

    this.getStudentDetails()
    this.studentForm.disable()

  }

  getStudentDetails() {
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();
    if (this.StudentTokenDetails != null) {


      this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe({
        next: (student: Student) => {
          this.StudentDetails = student;
        },
        error: () => {
          this.toastr.error("Failed to load student details. Please try again later.", "Error", {
            positionClass: "toast-top-right",
            progressBar: true,
            timeOut: 4000,
            closeButton: true
          });
        }, complete: () => {
          this.assignStudentData();

        }
      });

    }
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
        addressLine1: studentData.address.addressLine1 || 'AddressLine1 Not included',
        addressLine2: studentData.address.addressLine2 || 'AddressLine2 Not included',
        city: studentData.address.city,
        postalCode: studentData.address.postalCode,
        country: studentData.address.country
      }
    }

    this.StudentApiService.UpdateStudentPersonalInfo(this.StudentTokenDetails.Id, student).subscribe({
      next: (data: any) => {
        this.toastr.success("User Update Successful", "", {
          progressBar: true,
          timeOut: 4000,
          positionClass: 'toast-bottom-right'
        });
        this.changeEditMode()
      },
      error: () => {
        this.toastr.error("User Update Failed. Try again later.", "", {
          progressBar: true,
          timeOut: 4000,
          positionClass: 'toast-bottom-right'
        });
      },
      complete: () => {
        console.log("Student update operation completed.");
      }
    });

  }

  assignStudentData() {
    console.log(this.studentForm.value); // Check the form group object in the console
    let Gender = 3;
    const genderValue = this.StudentDetails?.gender.toLowerCase();
    const dateOfBirth = new Date(this.StudentDetails?.dateOfBirth).toISOString().split('T')[0];


    if (genderValue == "male") {
      Gender = 1;
    } else if (genderValue == "female") {
      Gender = 2;
    }
    if (this.StudentDetails) {
      const address = this.StudentDetails.address || {
        addressLine1: 'AddressLine1 Not included',
        addressLine2: 'AddressLine2 Not included',
        city: 'City Not included',
        postalCode: 'Postalcode is Not Included',
        country: 'Country Not included',
      };

      this.studentForm.patchValue({
        firstName: this.StudentDetails.firstName,
        lastName: this.StudentDetails.lastName,
        phone: this.StudentDetails.phone,
        dateOfBirth: dateOfBirth,
        gender: Gender,
        address: address,
      });

    }


  }


  changeEditMode() {
    this.IsEditMode = !this.IsEditMode

    if (this.IsEditMode) {
      this.studentForm.enable();
      this.toastr.success("Profile Edit Mode Activated", "")
    } else {
      this.studentForm.disable();
      this.toastr.success("Your profile is now in view-only mode.", "")
    }
  }
  changeStudentPassword() {
    let obj: passwordRequest = {
      oldPassword: this.changePass.get('oldPassword')?.value,
      confirmPassword: this.changePass.get('confirmPassword')?.value
    }

    this.StudentApiService.ChangePassword(this.StudentTokenDetails.Id, obj).subscribe({
      next: (response: any) => {
        this.toastr.success(response);
        this.changePass.reset();
      }, error: (error) => {
        this.toastr.error("password Change invalid try again Later");
      }
    })
  }

  deactivateStudent(){
    this.StudentApiService.deleteStudent(this.StudentTokenDetails.Id).subscribe({
      next:()=>{
        this.toastr.success("Student Deactivates SuccessFully")
        this.authService.logout();
      }
    })
  }

}

export interface StudenUpdateRequest {
  firstName: string;
  lastName?: string;
  dateOfBirth: Date;
  gender: number;
  phone: string;
  address: Address
}

interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
}

interface passwordRequest {
  oldPassword: string;
  confirmPassword: string;
}