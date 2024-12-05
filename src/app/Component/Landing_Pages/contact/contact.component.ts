import { Component } from '@angular/core';
import { Navebar01Component } from '../../common_components/navebar-01/navebar-01.component';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../Service/API/ContactUs/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [Navebar01Component,FooterComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService:ContactService,
    private toastr:ToastrService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email]], 
      message: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.addContactDetails(this.contactForm.value).subscribe({
        next: () => {
          this.toastr.success("Message Sent Successfull" , "" , )
        }
      })
      this.contactForm.reset();
    }
  }
}


export interface ContactUsRequest{
  name: string;
  email: string;
  message: string;
}