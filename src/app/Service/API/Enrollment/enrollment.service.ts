import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enrollment } from '../../../Modals/modals';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  constructor(private http:HttpClient) { }

  private apiUrl = environment.apiUrl

  getAllEnrollmentsByStudentId(studentId:string){
    return this.http.get<Enrollment[]>(`${this.apiUrl}/Enrollment/Enrollments/${studentId}`)
  }
  
}
