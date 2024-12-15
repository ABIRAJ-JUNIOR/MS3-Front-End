import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  textToType: string = "Start your journey of growth, learning, and success today";
  displayedText: string = "";
  typingSpeed: number = 100;
  restartDelay: number = 10000; 
  
  ngOnInit(): void {
    this.startTypingEffect();
  }
  
  startTypingEffect(): void {
    let index = 0; 
    this.displayedText = "";
  
    const typingInterval = setInterval(() => {
      if (index < this.textToType.length) {
        this.displayedText += this.textToType[index];
        index++;
      } else {
        clearInterval(typingInterval); 
  
        setTimeout(() => {
          this.startTypingEffect();
        }, this.restartDelay);
      }
    }, this.typingSpeed);
  }
}
