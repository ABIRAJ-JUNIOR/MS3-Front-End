import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";



@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  textToType: string = "Your Sign-In Can Change the World";
  displayedText: string = ""; 
  typingSpeed: number = 100; 

  ngOnInit(): void {
    this.startTypingEffect();
  }

  startTypingEffect(): void {
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < this.textToType.length) {
        this.displayedText += this.textToType[index];
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, this.typingSpeed);
  }
}
  

