import { CommonModule } from "@angular/common";
import { Component, ViewChild, ElementRef } from "@angular/core";
import html2canvas from "html2canvas";
import { ToastrService } from "ngx-toastr";
import { Student } from "../../../Modals/modals";
import { StudentService } from "../../../Service/API/Student/student.service";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { StudentAssessmentService } from "../../../Service/API/Student-Assessment/student-assessment.service";


@Component({
  selector: 'app-student-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-result.component.html',
  styleUrl: './student-result.component.css'
})
export class StudentResultComponent {

  constructor(private StudentAssesmentService:StudentAssessmentService, private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService,  private toastr: ToastrService) {

    
  }


  StudentAssesmentDetails: any;
  StudentTokenDetails: any;

  ngOnInit(): void {
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();
    console.log(this.StudentTokenDetails)

    this.StudentAssesmentService.getAllAssesmentByStudentid(this.StudentTokenDetails.Id).subscribe((assesment: any) => {
      this.StudentAssesmentDetails = assesment
      console.log(assesment )
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
