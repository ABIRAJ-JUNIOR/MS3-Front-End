import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

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
