import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../../Modals/modals';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'https://localhost:7044/api'

  getCourses(){
    return this.http.get<Course[]>(this.apiUrl + '/Course/Course')
  }

  pagination(pageNumber:number , pageSize:number){
    return this.http.get<any>(this.apiUrl + `/Course/Pagination/${pageNumber}/${pageSize}`)
  }
}
