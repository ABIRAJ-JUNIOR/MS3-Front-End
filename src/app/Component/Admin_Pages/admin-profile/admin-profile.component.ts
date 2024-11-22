import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  onEditProfile() {
    console.log('Edit Profile button clicked');
  }

  onAccountSettings() {
    console.log('Account Settings button clicked');
  }
}
