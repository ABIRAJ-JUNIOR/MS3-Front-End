import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin, AuditLog } from '../../Modals/modals';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'https://localhost:7044/api'

  getAdmins(){
    return this.http.get<Admin[]>(this.apiUrl + '/Admin/GetAll')
  }
  getAuditLogs(){
    return this.http.get<AuditLog[]>(this.apiUrl + '/AuditLog/GetAll')
  }

  pagination(pageNumber:number , pageSize:number){
    return this.http.get<any>(this.apiUrl + `/Admin/Pagination/${pageNumber}/${pageSize}`)
  }
}

