import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../../../Modals/modals';
import { StudentDashDataServiceService } from '../../../Service/Student/student-dash-data-service.service';
import { StudentService } from '../../../Service/Student/student.service';
import html2canvas from 'html2canvas';


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

  @ViewChild('table', { static: false }) table!: ElementRef;

  downloadTableAsImage() {
    // Capture the table using html2canvas
    html2canvas(this.table.nativeElement).then(canvas => {
      // Convert the canvas to an image (PNG format)
      const imageData = canvas.toDataURL('image/png');

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'table-image.png';  // Set the filename for the download
      link.click();  // Trigger the download
    });
  }
}
