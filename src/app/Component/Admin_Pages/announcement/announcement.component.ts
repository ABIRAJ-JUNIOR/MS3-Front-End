import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnnouncementService } from '../../../Service/Announcement/announcement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent {
  announcementForm!: FormGroup;
  Announcements: any[] = []

  // Pagination
  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 0;
  currentLength: number = 0;
  totalItems: number = 0;

  constructor(private fb: FormBuilder, private Announcemenrservice: AnnouncementService, private toastr: ToastrService) {
    this.announcementForm = this.fb.group({
      title: ['', [Validators.required]],
      expirationDate: ['', Validators.required],
      audienceType: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.loaditems()
  }

  onSubmit(): void {
    if (this.announcementForm.valid) {
      var data = this.announcementForm.value
      data.audienceType = Number(data.audienceType)
      const Formdata: AnnoincemenrReqest = {
        title: data.title,
        expirationDate: data.expirationDate,
        audienceType: data.audienceType
      }
      this.Announcemenrservice.AddAnouncement(Formdata).subscribe({
        next: (responce: any) => {

        },
        complete: () => {
          this.loaditems()
          this.toastr.success('Announcement added  Successful', '', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut: 4000,
          });
        },
        error: (err: any) => {
          this.toastr.error('Failed to load data', '', {
            positionClass: 'toast-top-right',
            progressBar: true,
          });
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

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loaditems();
    }
  }

  onDelete(id: string) {
    this.Announcemenrservice.deleteAnnouncement(id).subscribe({
      next: (responce: any) => { }
      ,
      complete: () => {
        this.toastr.success('Delete  Successful', '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 4000,
        });
        this.loaditems();
      },
      error: (err: any) => {
        this.toastr.error('Failed to load data', '', {
          positionClass: 'toast-top-right',
          progressBar: true,
        });
      }
    })
  }
}


export interface AnnoincemenrReqest {
  title: string;
  expirationDate: string;
  audienceType: Number;
}
