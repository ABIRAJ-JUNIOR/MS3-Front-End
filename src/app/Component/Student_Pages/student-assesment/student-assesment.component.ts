import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { StudentService } from "../../../Service/API/Student/student.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-student-assesment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-assesment.component.html',
  styleUrl: './student-assesment.component.css'
})
export class StudentAssesmentComponent implements OnInit {

  TableView: number = 2;



  constructor(private StudentService: StudentService, private studentDataService: StudentDashDataService) {

  }
  paginateBeforeData: any[] = []; // Your full array of data
  currentPage: number = 1; // Current page number
  pageSize: number = 5; // Number of items per page
  totalPages: number = 0;
  paginatedAssesment: any[] = [];

  StatusCheck: string = "Completed"
  NotStartCheck: string = "NotStarted"

  StudentDetails: any;
  ngOnInit() {

    this.paginateAssesment()
  }
  // Update paginatedData based on currentPage and pageSize
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedAssesment = this.paginateBeforeData.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.paginateBeforeData.length / this.pageSize);
  }

  // Navigate to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  paginateAssesment() {
    this.StudentDetails = this.studentDataService.GetStudentDeatilByLocalStorage()
    
    this.StudentService.getStudent(this.StudentDetails.Id).subscribe({
      next: (d: any) => {
        this.paginatedAssesment = d.enrollments
      },error:(error)=>{
        console.log(error)
      }
    })
  }



  assesmentLink: string = "";

  examdataTransfer(assessmentLink: string) {
    this.assesmentLink = assessmentLink
  }
  GoExam() {
    alert(this.assesmentLink)
    if (this.assesmentLink) {
      window.open(this.assesmentLink, '_blank');
    }
  }

  
}
