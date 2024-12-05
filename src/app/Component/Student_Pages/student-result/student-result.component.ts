import { CommonModule } from "@angular/common";
import { Component, ViewChild, ElementRef } from "@angular/core";
import html2canvas from "html2canvas";
import { ToastrService } from "ngx-toastr";
import { Student, StudentAssessment } from "../../../Modals/modals";
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

  constructor(private StudentAssesmentService: StudentAssessmentService, private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService, private toastr: ToastrService) {



  }
  pageSize: number = 6; // Courses per page
  currentPage: number = 1; // Current page index
  totalPages: number = 0; // Total number of pages
  pageNumbers: number[] = []; // Array of page numbers to display
  StudentAssesmentDetails: StudentAssessment[]=[];
  StudentTokenDetails: any;

  ngOnInit(): void {
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();
    this.getAssesments();
  }
  

  getAssesments() {
    this.StudentAssesmentService.getPaginationByStudentId(this.StudentTokenDetails.Id, this.currentPage, this.pageSize).subscribe({
      next: (assesment: any) => {
        this.StudentAssesmentDetails=assesment.items;
        this.totalPages = assesment.totalPages;
        this.pageNumbers=assesment.totalPages;
      }, error: (error) => {
        this.toastr.error("Failed to load student details. Please try again later.", "Error", {
          positionClass: "toast-top-right",
          progressBar: true,
          timeOut: 3000,
          closeButton: true
        });
      }, complete: () => {
      },
    })
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAssesments();
    }
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
