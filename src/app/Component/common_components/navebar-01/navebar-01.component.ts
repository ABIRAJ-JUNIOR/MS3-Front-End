import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopinfoComponent } from '../topinfo/topinfo.component';

@Component({
  selector: 'app-navebar-01',
  standalone: true,
  imports: [RouterModule,TopinfoComponent],
  templateUrl: './navebar-01.component.html',
  styleUrl: './navebar-01.component.css'
})
export class Navebar01Component {

  sidebarCollapsed = false;
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
