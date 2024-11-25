import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin, AuditLog } from '../../Modals/modals';
import { AdminRequest } from '../../Component/Admin_Pages/admin-list/admin-list.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'https://localhost:7044/api'

  addAdmin(admin:AdminRequest){
    return this.http.post(`${this.apiUrl}/Admin`, admin);
  }

  addimage(adminId:string , image:any){
    return this.http.post(`${this.apiUrl}/Admin/image/${adminId}`, image,{
      responseType:'text'
    });
  }

  deleteAdmin(adminId:string){
    return this.http.delete(`${this.apiUrl}/Admin/${adminId}`);
  }

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

