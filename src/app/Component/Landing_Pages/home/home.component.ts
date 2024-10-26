import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';


@Component({
  selector: 'app-Home',
  standalone: true,
  imports: [RouterModule,CommonModule,FooterComponent,Navebar01Component],
  templateUrl: './Home.component.html',
  styleUrl: './Home.component.css'
})
export class HomeComponent {
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
  
    ngOnInit(): void {}
  
    ngAfterViewInit(): void {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            } else {
              entry.target.classList.remove('in-view');
            }
          });
        },
        { threshold: 0.3 } 
      );
  
      this.courseCards.forEach(card => observer.observe(card.nativeElement));
    }
}
