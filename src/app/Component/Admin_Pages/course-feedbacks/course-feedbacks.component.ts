import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-feedbacks',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './course-feedbacks.component.html',
  styleUrl: './course-feedbacks.component.css'
})
export class CourseFeedbacksComponent {
  feedbacks = [
    {
      studentName: 'John Doe',
      courseName: 'Angular Development',
      rating: 4.5,
      comments: 'Great course with an excellent instructor!',
      date: new Date(),
    },
    {
      studentName: 'Jane Smith',
      courseName: 'Data Science Basics',
      rating: 4.0,
      comments: 'Very informative and easy to follow.',
      date: new Date(),
    },
    {
      studentName: 'Jane Smith',
      courseName: 'Data Science Basics',
      rating: 4.0,
      comments: 'Very informative and easy to follow.',
      date: new Date(),
    },
    {
      studentName: 'Jane Smith',
      courseName: 'Data Science Basics',
      rating: 4.0,
      comments: 'Very informative and easy to follow.',
      date: new Date(),
    },
    {
      studentName: 'Jane Smith',
      courseName: 'Data Science Basics',
      rating: 4.0,
      comments: 'Very informative and easy to follow.',
      date: new Date(),
    },
    {
      studentName: 'Jane Smith',
      courseName: 'Data Science Basics',
      rating: 4.0,
      comments: 'Very informative and easy to follow.',
      date: new Date(),
    },
  ];

  paginatedFeedbacks:any[] = [];
  currentPage = 1;
  itemsPerPage = 6; // Number of feedbacks per page
  totalPages = 0;
  pages:any[] = [];

  ngOnInit() {
    this.calculatePagination();
    this.paginate();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.feedbacks.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedFeedbacks = this.feedbacks.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }
}
