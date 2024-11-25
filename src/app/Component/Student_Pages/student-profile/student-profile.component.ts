import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent {

  quotes: string[] = [
    "The future belongs to those who believe in the beauty of their dreams.",
    "Your success is your responsibility. Take the initiative!",
    "Learning is the first step to earning.",
    "Success doesn’t come to you, you go to it.",
    "Be a student as long as you still have something to learn, and this will mean all your life."
  ];

  selectedQuote: string = '';

  constructor() {
    this.generateNewQuote(); 
  }

  generateNewQuote(): void {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    this.selectedQuote = this.quotes[randomIndex];
  }

  IsReadonly:boolean=true

  toggleEdit(): void {
      this.IsReadonly = !this.IsReadonly;
  }
}
