import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AssesmentService } from '../../../Service/assesment.service';

@Component({
  selector: 'app-student-assesment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-assesment.component.html',
  styleUrl: './student-assesment.component.css'
})
export class StudentAssesmentComponent implements OnInit {


  constructor(private assesmentService:AssesmentService){

  }
 
}
