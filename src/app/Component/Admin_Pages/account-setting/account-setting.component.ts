import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-setting',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './account-setting.component.html',
  styleUrl: './account-setting.component.css'
})
export class AccountSettingComponent {
  firstName = 'John';
  lastName = 'Doe';
  phone = '0702274212'
  email = 'john.doe@example.com';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  language = 'English';
  profilePicture = 'https://via.placeholder.com/150'; 

  passwordNotMatch:boolean = false 
 
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
      this.passwordNotMatch = true
      return;
    }
 
    console.log('Saving changes...', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      language: this.language
    });
 
    alert('Changes saved successfully!');
  }
}
