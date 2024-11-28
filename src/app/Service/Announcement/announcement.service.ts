import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  constructor(private http:HttpClient) { }

  private apiUrl = 'https://localhost:7044/api'

AddAnouncement(announcement:any){
  return this.http.post(`${this.apiUrl}/Announcement`, announcement);
}
GetAllAnouncement(){
  return this.http.get<any[]>(`${this.apiUrl}/Announcement`);
}
}
