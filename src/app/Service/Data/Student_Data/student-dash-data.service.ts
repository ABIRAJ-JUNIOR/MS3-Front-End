import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class StudentDashDataService {

  constructor() { }

  GetStudentDeatilByLocalStorage(): any {
    const token = localStorage.getItem("token");
    const decode: any = token != null ? jwtDecode(token) : ""
    return decode
  }
}
