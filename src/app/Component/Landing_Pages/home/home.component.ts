import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { AuthService } from '../../../Service/Auth/auth.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FooterComponent,Navebar01Component,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isAdmin:boolean = false;
  isStudent:boolean = false;

  sidebarCollapsed = false;

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

  topCourses = [
    {
      title: 'Full-Stack Web Development',
      description: 'Learn to build modern websites and web apps using the latest technologies.',
      image: 'https://res.cloudinary.com/dgpyq5til/image/upload/v1732463529/iryahxtpxm5qv1wmikco.jpg',
      rating: 4.9,
      feedbackCount: 1200,
      link: '/courses/fullstack'
    },
    {
      title: 'Data Science & AI',
      description: 'Dive into data analysis, machine learning, and artificial intelligence.',
      image: 'https://res.cloudinary.com/dgpyq5til/image/upload/v1732463529/iryahxtpxm5qv1wmikco.jpg',
      rating: 4.8,
      feedbackCount: 900,
      link: '/courses/datascience'
    },
    {
      title: 'Cybersecurity Essentials',
      description: 'Master the art of protecting digital systems from cyber threats.',
      image: 'https://res.cloudinary.com/dgpyq5til/image/upload/v1732463529/iryahxtpxm5qv1wmikco.jpg',
      rating: 4.7,
      feedbackCount: 800,
      link: '/courses/cybersecurity'
    }

  ];

}
