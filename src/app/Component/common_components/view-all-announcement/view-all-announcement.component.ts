import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from '../../../Modals/modals';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnnouncementService } from '../../../Service/API/Announcement/announcement.service';

@Component({
  selector: 'app-view-all-announcement',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './view-all-announcement.component.html',
  styleUrl: './view-all-announcement.component.css'
})
export class ViewAllAnnouncementComponent {
  announcements:Announcement[] = [];

  searchQuery: string = '';

  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 0;
  currentLength:number = 0;
  totalItems:number = 0;

  constructor(
    private router: Router,
    private announcementService:AnnouncementService
  ) {}

  ngOnInit(): void {
    this.loadAnnouncement();
    
  }

  loadAnnouncement():void{
    this.announcementService.Pagination(this.currentPage,this.pageSize,"Admin").subscribe({
      next:(response:any)=>{
        this.announcements = response.items;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItem;
      },
      complete:()=>{
        this.currentLength = this.announcements.length
    console.log(this.announcements.length , this.pageSize);

      },
      error:(error:any)=>{
        console.log(error.error);
      }
    })
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAnnouncement();
    }
  }

  goBack(){

  }
}
