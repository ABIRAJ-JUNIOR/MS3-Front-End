import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Announcement } from '../../../Modals/modals';

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
    return this.http.get<Announcement[]>(`${this.apiUrl}/Announcement`);
  }

  GetRecentAnnouncements(type:number){
    return this.http.get<Announcement[]>(`${this.apiUrl}/Announcement/Recent/${type}`)
  }

  deleteAnnouncement(id: string) {
    return this.http.delete(`${this.apiUrl}/Announcement/${id}`, {
      responseType: 'text',
    });
  }

  Pagination(pagenumber: Number, pagesize: Number,role?:string) {
    if(role != null){
      return this.http.get(
        `${this.apiUrl}/Announcement/Pagination/${pagenumber}/${pagesize}?role=${role}`
      );
    }else{
      return this.http.get(
        `${this.apiUrl}/Announcement/Pagination/${pagenumber}/${pagesize}`
      );
    }
  }
}
