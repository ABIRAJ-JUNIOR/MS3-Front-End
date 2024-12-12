import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackServiceService } from '../../../Service/API/Feedback/feedback-service.service';
import { FeedBack } from '../../../Modals/modals';

@Component({
  selector: 'app-course-feedbacks',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './course-feedbacks.component.html',
  styleUrl: './course-feedbacks.component.css'
})
export class CourseFeedbacksComponent implements OnInit {
  feedbacks:FeedBack[] = [];
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  currentLength: number = 0;
  totalItems: number = 0;

  constructor(private readonly feedbackService:FeedbackServiceService){}


  ngOnInit() {
    this.loadFeedBacks();
  }

  private loadFeedBacks():void{
    this.feedbackService.pagination(this.currentPage,this.pageSize).subscribe({
      next:(response:any)=>{
        this.feedbacks = response.items;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItem;
      },
      complete:()=>{
        this.currentLength = this.feedbacks.length;
      },
      error:(error:any)=>{
        console.log(error.error);
      }
    })
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadFeedBacks();
    }
  }

}
