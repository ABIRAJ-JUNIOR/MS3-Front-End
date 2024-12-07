import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  constructor(private http:HttpClient) { }

  private apiUrl = environment.apiUrl

  getAllEnrollmentsByStudentId(studentId:string){
    return this.http.get(`${this.apiUrl}/Enrollment/Enrollments/${studentId}`)
  }
  
}
