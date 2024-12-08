import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verified',
  standalone: true,
  imports: [],
  templateUrl: './email-verified.component.html',
  styleUrl: './email-verified.component.css'
})
export class EmailVerifiedComponent {

  studentID:string
  constructor(
    private readonly rout:ActivatedRoute,
  ){
    this.studentID = this.rout.snapshot.params['id'];
  }

  

}
