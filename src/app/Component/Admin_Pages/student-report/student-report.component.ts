import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { StudentService } from '../../../Service/Student/student.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../../Modals/modals';

@Component({
  selector: 'app-student-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-report.component.html',
  styleUrl: './student-report.component.css'
})
export class StudentReportComponent implements OnInit{
  studentData!:Student;
  paymentData:any;

  studentID:string = ""

  constructor(private studentService:StudentService ,private rout:ActivatedRoute){
    this.studentID = this.rout.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadItems()
  }

  loadItems(): void {
    this.studentService.getStudent(this.studentID).subscribe({
      next:((response:Student) => {
        this.studentData = response
        this.studentData.imagePath = response.imagePath  != null ? "https://localhost:7044/" + response.imagePath : undefined;
      }),
      complete:() => {
        
      }
    });
  }

  downloadReportAsPng() {
    const element = document.getElementById('reportContent');
    if (!element) {
      console.error('Element not found!');
      return;
    }
    html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
    })
      .then((canvas:any) => {
        const imageData = canvas.toDataURL('image/png', 1.0);

        const link = document.createElement('a');
        link.href = imageData;
        link.download = `${this.studentData.firstName}-${this.studentData.lastName}.png`;
        link.click();
      })
      .catch((err:any) => console.error('Error generating high-quality PNG:', err));
  }

}


