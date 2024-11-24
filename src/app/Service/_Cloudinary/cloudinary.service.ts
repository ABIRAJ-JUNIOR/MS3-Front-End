import { Injectable } from '@angular/core';
import {Cloudinary} from '@cloudinary/url-gen';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cloudinary: Cloudinary;
  private cloudName = 'dgpyq5til';
  private uploadPreset = 'ml_default'; 

  constructor() {
    this.cloudinary = new Cloudinary({
      cloud: {
        cloudName: this.cloudName,
      },
    });
  }


  async uploadFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    return response.json();
  }
}
