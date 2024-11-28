import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../../../Modals/modals';
import { StudentDashDataServiceService } from '../../../Service/Student/student-dash-data-service.service';
import { StudentService } from '../../../Service/Student/student.service';
import { saveAs } from 'file-saver'; // Import the FileSaver.js library


@Component({
  selector: 'app-student-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-result.component.html',
  styleUrl: './student-result.component.css'
})
export class StudentResultComponent {


  constructor(private StudentDashDataService: StudentDashDataServiceService, private StudentApiService: StudentService,  private toastr: ToastrService) {

  }


  StudentDetails: any;
  StudentTokenDetails: any;

  ngOnInit(): void {
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();
    console.log(this.StudentTokenDetails)

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.StudentDetails = student.enrollments
      console.log(this.StudentDetails)
    },
      (error) => {
        this.toastr.error("Failed to load student details. Please try again later.", "Error", {
          positionClass: "toast-top-right", 
          progressBar: true,
          timeOut: 3000,
          closeButton: true
       
        });
      })


  }


   // Method to download assessment details as a JSON file
   downloadAssessmentDetails(data:any) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'assessment-details.json');
  }
}
