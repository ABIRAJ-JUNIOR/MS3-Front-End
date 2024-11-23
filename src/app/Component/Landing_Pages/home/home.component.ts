import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { AuthService } from '../../../Service/Auth/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule,FooterComponent,Navebar01Component],
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

  courses = [
    {
      title: 'Web Development',
      description: 'Learn HTML, CSS, JavaScript, and build dynamic websites.',
      image: 'Home/web-design-concept-with-drawings.jpg',
      link: '/web-development'
    },
    {
      title: 'Data Science',
      description: 'Master data analysis, visualization, and machine learning.',
      image: 'Home/pexels-divinetechygirl-1181354.jpg',
      link: '/data-science'
    },
    {
      title: 'Mobile App Development',
      description: 'Develop mobile apps for Android and iOS using modern tools.',
      image: 'Home/5467426_1720.jpg',
      link: '/mobile-app-development'
    }
  ];

  @ViewChildren('courseCard') courseCards!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    if (!this.courseCards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            target.classList.add('in-view');
          } else {
            target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    this.courseCards.forEach((card) => observer.observe(card.nativeElement));
  }
}
