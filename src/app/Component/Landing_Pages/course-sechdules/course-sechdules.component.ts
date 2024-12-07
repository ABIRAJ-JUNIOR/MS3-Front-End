import { Component } from '@angular/core';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { FooterComponent } from '../../common_components/footer/footer.component';

@Component({
  selector: 'app-course-sechdules',
  standalone: true,
  imports: [Navebar01Component,FooterComponent],
  templateUrl: './course-sechdules.component.html',
  styleUrl: './course-sechdules.component.css'
})
export class CourseSechdulesComponent {

}
