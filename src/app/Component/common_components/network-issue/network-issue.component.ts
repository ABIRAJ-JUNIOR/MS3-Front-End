import { Component, OnInit } from '@angular/core';
import { NetworkServiceService } from '../../../Service/API/Network/network-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-network-issue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './network-issue.component.html',
  styleUrl: './network-issue.component.css'
})
export class NetworkIssueComponent implements OnInit{


  isOnline: boolean=false;

  constructor(private networkService: NetworkServiceService) {}

  ngOnInit() {
    this.isOnline = this.networkService.isOnline();

    this.networkService.getOnlineStatus().subscribe({
      next:()=>{
        this.isOnline = this.networkService.isOnline();
        console.log("jhsdfjk")
      }
    })
  }

  
}
