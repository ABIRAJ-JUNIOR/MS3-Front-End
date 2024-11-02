import { Component, OnInit } from '@angular/core';
import { Student, StudentService} from '../../../Service/student.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{
  students:Student[] = []
  constructor(private studentService:StudentService){}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next:(data:Student[]) => {
        this.students = data
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
}
