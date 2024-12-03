import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-payments-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './payments-overview.component.html',
  styleUrl: './payments-overview.component.css',
})
export class PaymentsOverviewComponent {
 firstName = 'John';
 lastName = 'Doe';
 email = 'john.doe@example.com';
 currentPassword = '';
 newPassword = '';
 confirmPassword = '';
 emailNotifications = true;
 language = 'English';
 profilePicture = 'assets/images/default-profile.jpg'; 

 onProfilePictureChange(event: any) {
   const file = event.target.files[0];
   if (file) {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => {
       this.profilePicture = reader.result as string;
     };
   }
 }

 onSubmit() {
   if (this.newPassword !== this.confirmPassword) {
     alert('Passwords do not match!');
     return;
   }

   console.log('Saving changes...', {
     firstName: this.firstName,
     lastName: this.lastName,
     email: this.email,
     currentPassword: this.currentPassword,
     newPassword: this.newPassword,
     emailNotifications: this.emailNotifications,
     language: this.language
   });

   alert('Changes saved successfully!');
 }
}
