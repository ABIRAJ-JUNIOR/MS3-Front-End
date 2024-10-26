import { Component } from '@angular/core';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { FooterComponent } from '../../common_components/footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [Navebar01Component,FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
