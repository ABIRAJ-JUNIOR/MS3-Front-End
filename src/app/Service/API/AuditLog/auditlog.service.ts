import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuditLog } from '../../../Modals/modals';
import { AuditLogRequest } from '../../../Component/Admin_Pages/student-list/student-list.component';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuditlogService {
  constructor(private http:HttpClient) { }

  private apiUrl = environment.apiUrl

  getAuditLogs(){
    return this.http.get<AuditLog[]>(this.apiUrl + '/AuditLog/GetAll')
  }

  addAuditLog(auditLog:AuditLogRequest){
    return this.http.post(this.apiUrl + '/AuditLog',auditLog)
  }
}
