import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnnouncementService } from '../../../Service/Announcement/announcement.service';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent {
  announcementForm!: FormGroup;
  constructor(private fb: FormBuilder,Announcemenrservice:AnnouncementService) {}
  ngOnInit(): void {
    // Initialize the form with validation rules
    this.announcementForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      expirationDate: ['', Validators.required],
      audienceType: ['', Validators.required]
    });
  }
    // Method to handle form submission
    onSubmit(): void {
      if (this.announcementForm.valid) {
        // Log the form value to the console
        console.log('Form Data:', this.announcementForm.value);
      } else {
        console.log('Form is invalid');
      }
    }
     // Method to reset the form
  onReset(): void {
    this.announcementForm.reset();
  }
}

export interface AnnoincemenrReqest{
  title:string;
  expirationDate:string;
  audienceType:Number;
}
