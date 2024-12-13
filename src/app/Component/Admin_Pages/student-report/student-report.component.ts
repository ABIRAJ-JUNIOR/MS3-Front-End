import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Service/API/Student/student.service';
import { ActivatedRoute } from '@angular/router';
import { Enrollment, Payment, Student, StudentAssessment } from '../../../Modals/modals';
import { FormsModule } from '@angular/forms';
import { EnrollmentService } from '../../../Service/API/Enrollment/enrollment.service';
import { StudentAssessmentService } from '../../../Service/API/Student-Assessment/student-assessment.service';

@Component({
  selector: 'app-student-report',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './student-report.component.html',
  styleUrl: './student-report.component.css'
})
export class StudentReportComponent implements OnInit{
  studentData!:Student
  enrollmentData!:Enrollment[]
  studentAssessments!:StudentAssessment[]

  paymentDatas:Payment[] = []
  studentID:string = ""

  constructor(
    private readonly studentService:StudentService,
    private readonly rout:ActivatedRoute,
    private readonly enrollmentService:EnrollmentService,
    private readonly studentAssessmentService:StudentAssessmentService
  ){
    this.studentID = this.rout.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadStudentData()
  }

  loadStudentData(): void {
    this.studentService.getStudent(this.studentID).subscribe({
      next:((response:Student) => {
        this.studentData = response
      }),
      complete:() => {
        this.enrollmentService.getAllEnrollmentsByStudentId(this.studentData.id).subscribe({
          next:(response:Enrollment[])=>{
            this.enrollmentData = response
          },
          complete:()=>{
            this.enrollmentData.forEach(e => {
              e.paymentResponse.forEach(p => {
                this.paymentDatas.push(p)
              })
            })
          }
        })

        this.studentAssessmentService.getAllAssesmentByStudentid(this.studentData.id).subscribe({
          next:(response:StudentAssessment[])=>{
            this.studentAssessments = response
          }
        })
      }
    });
  }

    

  async downloadReportAsPng() {
      const element = document.getElementById('reportContent');
      if (!element) {
        console.error('Element not found!');
        return;
      }
  
      const html2canvas = (await import('html2canvas')).default;
  
      const canvas = await html2canvas(element, {
        scale: 3, 
        useCORS: true, 
        backgroundColor: '#ffffff', 
      });
  
      const imageData = canvas.toDataURL('image/png', 1.0);
  
      const link = document.createElement('a');
      link.href = imageData;
  
      const firstName = this.studentData?.firstName || 'Student';
      const lastName = this.studentData?.lastName || 'Report';
  
      link.download = `${firstName}-${lastName}.png`;
      link.click();
  }

}


