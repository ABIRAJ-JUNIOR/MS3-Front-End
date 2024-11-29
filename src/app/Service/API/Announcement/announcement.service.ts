import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://localhost:7044/api';

  AddAnouncement(announcement: any) {
    return this.http.post(`${this.apiUrl}/Announcement`, announcement);
  }
  GetAllAnouncement() {
    return this.http.get<any[]>(`${this.apiUrl}/Announcement`);
  }
  deleteAnnouncement(id: string) {
    return this.http.delete(`${this.apiUrl}/Announcement/${id}`, {
      responseType: 'text',
    });
  }
  Pagination(pagenumber: Number, pagesize: Number) {
    return this.http.get(
      `${this.apiUrl}/Announcement/Pagination?pagenumber=${pagenumber}&pagesize=${pagesize}`
    );
  }
}
