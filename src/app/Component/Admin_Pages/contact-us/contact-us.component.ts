import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactUs } from '../../../Modals/modals';
import { ContactService } from '../../../Service/API/ContactUs/contact.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SearchContactUsPipe } from '../../../Pipes/search-contact-us.pipe';
import { AuditlogService } from '../../../Service/API/AuditLog/auditlog.service';
import { jwtDecode } from 'jwt-decode';
import { AuditLogRequest } from '../student-list/student-list.component';

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

  filterStatus: string = ""; 

  loginData!:any

  constructor(
    private contactUsService:ContactService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private modalService: BsModalService,
    private readonly auditLogService:AuditlogService
    ,
  ){
    this.initializeForm();

    const token = localStorage.getItem("token");
    if(token != null){
      const decode:any =jwtDecode(token)
      this.loginData = decode
      console.log(this.loginData)
    }
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  private initializeForm(): void {
    this.responseForm = this.fb.group({
      messagePreview:[''],
      response:['']
    })
  }
  
  loadMessages():void{
    this.contactUsService.getAllContactMessages().subscribe({
      next: (response:ContactUs[]) => {
        this.messages = response
      }
    })
  }
  
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
        this.toastr.success('Response Sent Successfull', '');
        
        this.loadMessages();

        const auditLog:AuditLogRequest = {
          action: 'Message Response',
          details: `Response a new Message with ID (${response.id})`,
          adminId: this.loginData.Id,
        }
        this.auditLogService.addAuditLog(auditLog).subscribe({
          next:()=>{},
          error: (error: any) => {
            console.error('Error adding audit log:', error.error);
          }
        })
      },error:(error:any)=>{
        this.toastr.warning(error.error, ''); 
      }
    })
  }

  deleteMessage() {
    this.contactUsService.deleteMessage(this.messageId).subscribe({
      next: () => {
        this.toastr.success('Message Deleted Successfull', '')

        this.loadMessages();

        const auditLog:AuditLogRequest = {
          action: 'Delete Message',
          details: `Delete Message with ID (${this.messageId})`,
          adminId: this.loginData.Id,
        }
        this.auditLogService.addAuditLog(auditLog).subscribe({
          next:()=>{},
          error: (error: any) => {
            console.error('Error adding audit log:', error.error);
          }
        })
      },error:(error:any)=>{
        this.toastr.warning(error.error, '')
      }
    })
    this.modalRef?.hide()
  }

  openDeleteModal(template: any, messageId: string): void {
    this.modalRef = this.modalService.show(template);
    this.messageId = messageId;
  }
}
