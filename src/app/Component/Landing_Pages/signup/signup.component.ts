import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
 

  StudentRegistration:FormGroup;

  constructor(private fb:FormBuilder){
    this.StudentRegistration=this.fb.group({
      firstname :['',Validators.required],
      lastname :[''],
      email:['',Validators.required,Validators.email],
      password:['',Validators.required,Validators.minLength(4)],
      repeatPassword:['',Validators.required],
      dateOfbirth:['',Validators.required],
      gender:['',Validators.required],
      contact:['',Validators.required],
      

    })
  }
}
