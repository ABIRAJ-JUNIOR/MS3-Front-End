import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentDashDataServiceService } from '../../../Service/Student/student-dash-data-service.service';
import { StudentService } from '../../../Service/Student/student.service';
import { Student } from '../../../Modals/modals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent {

  quotes: string[] = [
    "The future belongs to those who believe in the beauty of their dreams.",
    "Your success is your responsibility. Take the initiative!",
    "Learning is the first step to earning.",
    "Success doesn’t come to you, you go to it.",
    "Be a student as long as you still have something to learn, and this will mean all your life."
  ];

  selectedQuote: string = '';

  constructor(private StudentDashDataService: StudentDashDataServiceService, private StudentApiService: StudentService, private router: Router) {
    this.generateNewQuote();
  }

  generateNewQuote(): void {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    this.selectedQuote = this.quotes[randomIndex];
  }

  IsReadonly: boolean = true

  toggleEdit(): void {
    this.IsReadonly = !this.IsReadonly;
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


  selectedGrade: string = 'Update Soon';  // Default grade
  Enrollments: any;
  paymentFee: number = 0;
  SelectId: string = '';

  onCourseSelect() {
    console.log(this.SelectId);

    this.Enrollments = this.StudentDetails.enrollments.find((Data: any) => {
      return Data.id === this.SelectId
    })
    console.log(this.Enrollments);

    this.paymentFee = 0
    for (let i: number = 0; i < this.Enrollments.paymentResponse.length; i++) {
      const element = this.Enrollments.paymentResponse[i];
      console.log(element)
      this.paymentFee += element.amountPaid
    }
    console.log(this.paymentFee)
  }


  getProgress(item: any): number {
    const startDate = new Date(item.courseScheduleResponse.startDate);
    const endDate = new Date(item.courseScheduleResponse.endDate);
    const currentDate = new Date();

    // Ensure that the progress doesn't go below 0% or above 100%
    if (currentDate < startDate) {
      return 0;  // Progress is 0 if the course hasn't started
    } else if (currentDate > endDate) {
      return 100;  // Progress is 100 if the course has ended
    } else {
      // Calculate progress based on the current date
      const totalDuration = endDate.getTime() - startDate.getTime();
      const elapsedTime = currentDate.getTime() - startDate.getTime();
      return (elapsedTime / totalDuration) * 100;
    }
  }






}
