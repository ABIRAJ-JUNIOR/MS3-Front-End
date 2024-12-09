import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnnouncementService } from '../../../Service/API/Announcement/announcement.service';
import { ToastrService } from 'ngx-toastr';
import { AuditlogService } from '../../../Service/API/AuditLog/auditlog.service';
import { jwtDecode } from 'jwt-decode';
import { AuditLogRequest } from '../student-list/student-list.component';
import { Announcement } from '../../../Modals/modals';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SearchAnnouncementPipe } from '../../../Pipes/search-announcement.pipe';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule,BsDatepickerModule,SearchAnnouncementPipe],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent {
  announcementForm!: FormGroup;
  Announcements: Announcement[] = []
  filterStatus: string = ""; 
  // Pagination
  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 0;
  currentLength: number = 0;
  totalItems: number = 0;

  loginData!:any

  constructor(
    private fb: FormBuilder, 
    private Announcemenrservice: AnnouncementService, 
    private toastr: ToastrService,
    private readonly auditLogService:AuditlogService
  ) {
    this.initializeForm()

    const token = localStorage.getItem("token");
    if(token != null){
      const decode:any =jwtDecode(token)
      this.loginData = decode
      console.log(this.loginData)
    }
   }

  ngOnInit(): void {
    this.loaditems()
  }

  private initializeForm(): void {
    this.announcementForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      expirationDate: ['', Validators.required],
      audienceType: ['', Validators.required]
    });
  }

  loaditems(): void {
    this.Announcemenrservice.Pagination(this.currentPage, this.pageSize).subscribe({
      next: (value: any) => {
        this.Announcements = value.items,
        this.totalPages = value.totalPages;
        this.totalItems = value.totalItem;
        console.log(value);

      },
      complete: () => {
        this.currentLength = this.Announcements.length
      },
    })
  }

  onSubmit(): void {
    if (this.announcementForm.valid) {
      var data = this.announcementForm.value
      data.audienceType = Number(data.audienceType)
      const Formdata: AnnoincemenrReqest = {
        title: data.title,
        description: data.description,
        expirationDate: data.expirationDate,
        audienceType: data.audienceType
      }
      this.Announcemenrservice.AddAnouncement(Formdata).subscribe({
        next: (response: any) => {
          this.toastr.success('Announcement added  Successful', '');
          this.loaditems()

          const auditLog:AuditLogRequest = {
            action: 'Add Announcement',
            details: `Added a new Announcement with ID (${response.id})`,
            adminId: this.loginData.Id,
          }
          this.auditLogService.addAuditLog(auditLog).subscribe({
            next:()=>{},
            error: (error: any) => {
              console.error('Error adding audit log:', error.error);
            }
          })
        },
        error: (err: any) => {
          this.toastr.error('Failed to load data', '');
        },
      })
      console.log('Form Data:', this.announcementForm.value);
      this.announcementForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }

  onReset(): void {
    this.announcementForm.reset();
  }

  

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loaditems();
    }
  }

  onDelete(id: string) {
    this.Announcemenrservice.deleteAnnouncement(id).subscribe({
      next: (response: any) => {
        const auditLog:AuditLogRequest = {
          action: 'Delete Announcement',
          details: `Delete Announcement with ID (${id})`,
          adminId: this.loginData.Id,
        }
        this.auditLogService.addAuditLog(auditLog).subscribe({
          next:()=>{},
          error: (error: any) => {
            console.error('Error adding audit log:', error.error);
          }
        })
       },
       complete: () => {
         this.toastr.success('Delete  Successful', '');
         this.loaditems();
       },
       error: (err: any) => {
         this.toastr.error('Failed to load data', '');
       }
      
    })
  }
}


export interface AnnoincemenrReqest {
  title: string;
  description: string;
  expirationDate: string;
  audienceType: Number;
}
