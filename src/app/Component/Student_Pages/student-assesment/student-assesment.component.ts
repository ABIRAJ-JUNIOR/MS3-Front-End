import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AssesmentService } from '../../../Service/assesment.service';
import { StudentService } from '../../../Service/Student/student.service';
import { StudentDashDataServiceService } from '../../../Service/Student/student-dash-data-service.service';

@Component({
  selector: 'app-student-assesment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-assesment.component.html',
  styleUrl: './student-assesment.component.css'
})
export class StudentAssesmentComponent implements OnInit {


  constructor(private StudentService:StudentService  , private studentDataService:StudentDashDataServiceService){

  }
  pageSize: number = 12; // Courses per page
  currentPage: number = 1; // Current page index
  totalPages: number = 4; // Total number of pages
  pageNumbers: number[] = []; // Array of page numbers to display
  paginatedAssesment: any[] = [];

  StudentDetails:any;
  ngOnInit() {
    this.paginateAssesment()
  }

  paginateAssesment(){
    this.StudentDetails=this.studentDataService.GetStudentDeatilByLocalStorage()
    this.StudentService.getStudent(this.StudentDetails.Id).subscribe((d:any)=>{
      console.log(d)

      this.paginatedAssesment = d.enrollments
      console.log(this.paginatedAssesment)
    },(error)=>{
      console.log(error)
    }
  )
  }

  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateAssesment();
    }
  }

 
}
