import { Component, ElementRef } from '@angular/core';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../common_components/footer/footer.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [Navebar01Component, CommonModule, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.initializeCounters();
  }

  initializeCounters(): void {
    const counters = this.el.nativeElement.querySelectorAll('.counter');
    const options = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target); 
        }
      });
    }, options);

    counters.forEach((counter:any) => observer.observe(counter));
  }

  animateCounter(counter:any): void {
    const target = +counter.getAttribute('data-count');
    const duration = 2000;
    let start = 0;
    const increment = target / (duration / 50);

    const updateCounter = () => {
      start += increment;
      if (start < target) {
        counter.innerText = Math.ceil(start);
        setTimeout(updateCounter, 50);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  }


  branches = [
    { name: 'Newyork Campus', image: 'About/newyork.png' },
    { name: 'London Branch', image: 'About/london.png' },
    { name: 'Washington Branch', image: 'About/washington.png' }
  ];

  activities = [
    {
      title: 'Playing Basketball',
      description: 'Our students enjoy an active sports program, including regular basketball games and tournaments.',
      image: 'About/basketball.png'
    },
    {
      title: 'Library',
      description: 'A quiet and well-resourced library, encouraging students to focus and dive deep into studies.',
      image: 'About/library.png'
    },
    {
      title: 'Cafeteria',
      description: 'Our cafeteria offers a variety of healthy meals, creating a comfortable place for students to relax.',
      image: 'About/cafeteria.png'
    }
  ];

}
