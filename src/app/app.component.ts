import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchStudentsPipe } from './Pipes/search-students.pipe';
import { CommonModule } from '@angular/common';
import { LoadingService } from './Service/Loading/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IT_Institute_Course_Management_System';

  isLoading = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    // Subscribe to the loading observable to show or hide the loading screen
    this.loadingService.loading$.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }
}
