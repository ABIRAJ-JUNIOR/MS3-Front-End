import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  courses = [
    {
      title: 'Web Development',
      description: 'Learn HTML, CSS, JavaScript, and build dynamic websites.',
      image: 'web-design-concept-with-drawings.jpg',
      link: '/web-development'
    },
    {
      title: 'Data Science',
      description: 'Master data analysis, visualization, and machine learning.',
      image: 'pexels-divinetechygirl-1181354.jpg',
      link: '/data-science'
    },
    {
      title: 'Mobile App Development',
      description: 'Develop mobile apps for Android and iOS using modern tools.',
      image: '5467426_1720.jpg',
      link: '/mobile-app-development'
    }
  ];
}
