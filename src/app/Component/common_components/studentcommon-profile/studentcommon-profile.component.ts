import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../../Modals/modals';
import { StudentDashDataServiceService } from '../../../Service/Student/student-dash-data-service.service';
import { StudentService } from '../../../Service/Student/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studentcommon-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studentcommon-profile.component.html',
  styleUrl: './studentcommon-profile.component.css'
})
export class StudentcommonProfileComponent {

  constructor(private StudentDashDataService: StudentDashDataServiceService, private StudentApiService: StudentService, private router: Router) {
  }


  StudentDetails: any;
  StudentTokenDetails: any;
  NoImage: string = "https://cdn-icons-png.flaticon.com/512/9193/9193906.png"

  ngOnInit(): void {

    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.StudentDetails = student
      console.log(this.StudentDetails)
    }
      ,
      (error) => {
        this.router.navigate([''])
      })

  }
}
