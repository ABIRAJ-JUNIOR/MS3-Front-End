import { Component } from '@angular/core';
import { CloudinaryService } from '../Service/_Cloudinary/cloudinary.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(private cloudinaryService: CloudinaryService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async uploadFile(): Promise<void> {
    if (this.selectedFile) {
      const response = await this.cloudinaryService.uploadFile(this.selectedFile);
      this.imageUrl = response.secure_url; // The URL of the uploaded image
      console.log('Uploaded Image URL:', this.imageUrl);
    }
  }
}
