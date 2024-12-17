import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private router:Router){}

  GoToHome(){
      this.router.navigate(['/Way/home'])
  }
  GoToAbout(){
    this.router.navigate(['/Way/about'])
  }

  GoToContact(){
    this.router.navigate(['/Way/contact'])
  }

  GoToCourse(){
    this.router.navigate(['/Way/course'])
  }
}
