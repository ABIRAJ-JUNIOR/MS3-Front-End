import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../Service/API/Auth/auth.service';

@Component({
  selector: 'app-email-verified',
  standalone: true,
  imports: [],
  templateUrl: './email-verified.component.html',
  styleUrl: './email-verified.component.css'
})
export class EmailVerifiedComponent implements OnInit {

  studentID:string
  constructor(
    private readonly rout:ActivatedRoute,
    private readonly authService:AuthService
  ){
    this.studentID = this.rout.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.authService.emailVerify(this.studentID).subscribe({
      next: (res) => {
      },
      error:(error:any)=>{
        console.log(error.error);
      }
    })
  }
}
