import { Component, OnInit } from '@angular/core';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseCardsComponent } from '../course-cards/course-cards.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [Navebar01Component, FooterComponent, RouterModule, CommonModule ,CourseCardsComponent ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent  {

}
