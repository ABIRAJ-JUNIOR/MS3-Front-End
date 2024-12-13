import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { AuthService } from '../../../Service/API/Auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../../../Service/API/Course/course.service';
import { NetworkIssueComponent } from "../../common_components/network-issue/network-issue.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, Navebar01Component, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isAdmin:boolean = false;
  isStudent:boolean = false;

  sidebarCollapsed = false;
  topCourses:any[] = [];

  constructor(
    private authService:AuthService,
    private courseService:CourseService
  ){
    if(authService.isLoggedInAdmin()){
      this.isAdmin = true
      this.isStudent = false
    }

    if(authService.isLoggedInStudent()){
      this.isAdmin = false
      this.isStudent = true
    }
  }

  ngOnInit(): void {
    this.courseService.getTop3Courses().subscribe({
      next:(response:any)=>{
        this.topCourses = response
      }
    })
  }
}
