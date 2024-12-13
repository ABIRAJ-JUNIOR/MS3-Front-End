import { Component } from '@angular/core';
import { StudentSettingComponent } from '../../Student_Pages/student-setting/student-setting.component';
import { Navebar01Component } from "../../common_components/navebar-01/navebar-01.component";
import { FooterComponent } from "../../common_components/footer/footer.component";

@Component({
  selector: 'app-home-profile',
  standalone: true,
  imports: [StudentSettingComponent, Navebar01Component, FooterComponent],
  templateUrl: './home-profile.component.html',
  styleUrl: './home-profile.component.css'
})
export class HomeProfileComponent {

}
