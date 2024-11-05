import { Component, OnInit } from '@angular/core';
import { Student, StudentService} from '../../../Service/student.service';
import { CommonModule } from '@angular/common';
import { SearchStudentsPipe } from '../../../Pipes/search-students.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule,SearchStudentsPipe,FormsModule,RouterModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent{
  students:Student[] = []
  SearchText:string = ""
  numberOfStudents:number = 0
  constructor(private studentService:StudentService){}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next:(response:Student[]) => {
        this.students = response
      },complete:() =>{
        this.students.forEach(s=>{
          this.numberOfStudents ++ 
        })
      },error:(err:any)=>{
        console.log(err)
      }
      
    })

  }

  
}
