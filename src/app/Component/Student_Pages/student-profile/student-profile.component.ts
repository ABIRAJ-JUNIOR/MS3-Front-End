import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { Student } from "../../../Modals/modals";
import { StudentService } from "../../../Service/API/Student/student.service";
import { StudentcommonProfileComponent } from "../../common_components/studentcommon-profile/studentcommon-profile.component";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule ,RouterModule ,StudentcommonProfileComponent],
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

  constructor(private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService, private router: Router) {
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








}

