import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackServiceService } from '../../../Service/API/Feedback/feedback-service.service';
import { Course, FeedBack } from '../../../Modals/modals';
import { CourseService } from '../../../Service/API/Course/course.service';
import { SearchFeedbackPipe } from '../../../Pipes/search-feedback.pipe';

@Component({
  selector: 'app-course-feedbacks',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchFeedbackPipe],
  templateUrl: './course-feedbacks.component.html',
  styleUrl: './course-feedbacks.component.css'
})
export class CourseFeedbacksComponent implements OnInit {
  feedbacks:FeedBack[] = [];
  courses:Course[] = []; 

  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  currentLength: number = 0;
  totalItems: number = 0;

  searchText:string = ""

  constructor(
    private readonly feedbackService:FeedbackServiceService,
    private readonly courseService:CourseService
  ){}


  ngOnInit() {
    this.loadFeedBacks();
    this.loadCourses();
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

    private loadCourses(): void {
      this.courseService.getCourses().subscribe({
        next: (data: Course[]) => {
          this.courses = data
        }
      });
    }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadFeedBacks();
    }
  }

  getRatingBadgeClass(rating: number): string {
    if (rating >= 4.5) {
      return 'bg-success text-light';
    } else if (rating >= 3.5) {
      return 'bg-warning text-dark';
    } else {
      return 'bg-secondary text-light';
    }
  }

  search(searchText:string){
    this.searchText = searchText
    console.log(this.searchText)
  }
}
