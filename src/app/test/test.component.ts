import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../Service/API/Auth/auth.service";



@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  textToType: string = "Your Sign-In Can Change the World";
  displayedText: string = ""; 
  typingSpeed: number = 100; 

  signinForm: FormGroup

  constructor(private fb: FormBuilder , private auth:AuthService , private rout:Router , private toastr:ToastrService) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
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

  onSubmit(){
    
  }
}
  

