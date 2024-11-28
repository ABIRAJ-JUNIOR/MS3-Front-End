import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";



@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
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
  

