import { Component, OnInit } from '@angular/core';
import { NetworkServiceService } from '../../../Service/API/Network/network-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-network-issue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './network-issue.component.html',
  styleUrl: './network-issue.component.css',
})
export class NetworkIssueComponent implements OnInit {
  isOnline: boolean = true;

  isSuccess: boolean = false;
  constructor(private networkService: NetworkServiceService) {}

  ngOnInit() {
    this.networkService.getOnlineStatus().subscribe({
      next: () => {
        this.isOnline = this.networkService.isOnline();
        window.scrollTo(0, 0);
        if (this.isOnline == true) {
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
          }, 3000);
        }
      },
    });
  }
}
