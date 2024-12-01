import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactUs } from '../../../Modals/modals';
import { ContactService } from '../../../Service/API/ContactUs/contact.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SearchContactUsPipe } from '../../../Pipes/search-contact-us.pipe';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule,SearchContactUsPipe],
  providers: [BsModalService],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  messages:ContactUs[] = []

  messageId:string = '';
  modalRef?: BsModalRef;
  responseForm!:FormGroup
  constructor(
    private contactUsService:ContactService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private modalService: BsModalService
    ,
  ){
    this.responseForm = fb.group({
      messagePreview:[''],
      response:['']
    })
  }

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

  response(Message: ContactUs){
    this.responseForm.patchValue({
      messagePreview:Message.message
    })
    this.messageId = Message.id
  }

  onSubmitResponse(){
    const formData = this.responseForm.value;
    const response = {
      id:this.messageId,
      response: formData.response
    }
    this.contactUsService.addResponse(response).subscribe({
      next: () => {
        this.toastr.success('Response Sent Successfull', '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 3000,
        });
      },complete:() => {
        this.loadMessages();
      },error:(error:any)=>{
        this.toastr.warning(error.error, '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 4000,
        }); 
      }
    })
  }

  deleteMessage() {
    this.contactUsService.deleteMessage(this.messageId).subscribe({
      next: () => {
        this.toastr.success('Message Deleted Successfull', '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 3000,
        })
      },complete:()=>{
        this.loadMessages();
      },error:(error:any)=>{
        this.toastr.warning(error.error, '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 4000,
        })
      }
    })
    this.modalRef?.hide()
  }

  openDeleteModal(template: any, messageId: string): void {
    this.modalRef = this.modalService.show(template);
    this.messageId = messageId;
  }
}
