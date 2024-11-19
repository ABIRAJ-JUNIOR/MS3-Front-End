import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'https://localhost:7044/api'

  getCourses(){
    return this.http.get<Course[]>(this.apiUrl + '/Course/Course')
  }
}

export interface Course{
  id:string,
  courseCategoryId:string,
  courseName:string,
  level:string,
  courseFee:number,
  description:string,
  prerequisites:string,
  imagePath:string,
  createdDate:Date,
  updatedDate:Date
}
