import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../Service/API/Auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topinfo',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './topinfo.component.html',
  styleUrl: './topinfo.component.css'
})
export class TopinfoComponent {
  isAdmin:boolean = false;
  isStudent:boolean = false;

  constructor(private authService:AuthService){
    if(authService.isLoggedInAdmin()){
      this.isAdmin = true
      this.isStudent = false
    }

    if(authService.isLoggedInStudent()){
      this.isAdmin = false
      this.isStudent = true
    }
  }
}
