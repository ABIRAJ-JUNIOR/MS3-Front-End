import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Student } from "../../../Modals/modals";
import { StudentService } from "../../../Service/API/Student/student.service";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";

@Component({
  selector: 'app-studentcommon-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studentcommon-profile.component.html',
  styleUrl: './studentcommon-profile.component.css'
})
export class StudentcommonProfileComponent {

  constructor(private tostr:ToastrService, private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService, private router: Router) {
  }


  StudentDetails: any;
  StudentTokenDetails: any;
  NoImage: string = "https://cdn-icons-png.flaticon.com/512/9193/9193906.png"
  previewUrl: string | null = null;
  ngOnInit(): void {

    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.StudentDetails = student
      this.previewUrl=this.StudentDetails.imageUrl
      console.log(this.StudentDetails)
    },(error)=>{
     console.log(error) 
    },()=>{
    })

  }


  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    console.log(this.StudentTokenDetails.Id)

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Generate a preview URL for the image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result; // Update preview
      };
      reader.readAsDataURL(file);

      this.uploadProfilePicture(file);
    }
  }

  // Upload file to backend
  private uploadProfilePicture(file: File): void {
    const formData = new FormData();
    formData.append('image', file); 
    this.StudentApiService.addImage(this.StudentTokenDetails.Id,formData).subscribe((response:any)=>{

        this.tostr.success("Profile Image Update Successfully");

    },(error)=>{
      this.tostr.error(error.message);
    },()=>{
    })


  }
}
