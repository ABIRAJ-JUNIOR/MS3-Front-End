import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import html2canvas from "html2canvas";
import { Student, Payment } from "../../../Modals/modals";
import { StudentService } from "../../../Service/API/Student/student.service";


@Component({
  selector: 'app-student-report',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './student-report.component.html',
  styleUrl: './student-report.component.css'
})
export class StudentReportComponent implements OnInit{
  studentData!:Student
  paymentDatas:Payment[] = []
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
      }),
      complete:() => {
        this.studentData.enrollments.forEach(e => {
          e.paymentResponse.forEach(p => {
            this.paymentDatas.push(p)
          })
        })
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


