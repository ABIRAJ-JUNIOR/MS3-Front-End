import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin, AuditLog } from '../../../Modals/modals';
import { AdminRequest } from '../../../Component/Admin_Pages/admin-list/admin-list.component';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  private apiUrl = environment.apiUrl

  addAdmin(admin:AdminRequest){
    return this.http.post(`${this.apiUrl}/Admin`, admin);
  }

  addImage(adminId:string ,image:any,isCover:boolean){
    return this.http.post(`${this.apiUrl}/Admin/image/${adminId}/$${isCover}`, image,{
      responseType:'text'
    });
  }

  updateFullDetails(adminId:string , admin:AdminRequest){
    return this.http.put<Admin>(`${this.apiUrl}/Admin/Update-Full-Details/${adminId}`,admin)
  }

  deleteAdmin(adminId:string){
    return this.http.delete(`${this.apiUrl}/Admin/${adminId}`);
  }

  getAdmins(){
    return this.http.get<Admin[]>(this.apiUrl + '/Admin/GetAll')
  }

  pagination(pageNumber:number , pageSize:number){
    return this.http.get<any>(this.apiUrl + `/Admin/Pagination/${pageNumber}/${pageSize}`)
  }
  getadminbyID(id:string){
    return this.http.get<Admin>(this.apiUrl + `/Admin/Get/${id}`)
  }
  updateAdminProfile(id:string,Admindata:any){
    return this.http.put(this.apiUrl+`/Admin/AdminProfile/${id}`,Admindata,{
      responseType:'text'
    })
  }
}

