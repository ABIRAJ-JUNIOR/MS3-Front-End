import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactUs } from '../../../Modals/modals';
import { ContactService } from '../../../Service/API/ContactUs/contact.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  messages:ContactUs[] = []

  constructor(private contactUsService:ContactService){}

  ngOnInit(): void {
    this.loadMessages();
  }
  
  loadMessages():void{
    this.contactUsService.getAllContactMessages().subscribe({
      next: (response:ContactUs[]) => {
        this.messages = response
      }
    })
  }
  
  filterStatus: string = ""; 

  markAsRead(Message: ContactUs){
    
  }

  deleteMessage(index: number) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.messages.splice(index, 1);
    }
  }
}
