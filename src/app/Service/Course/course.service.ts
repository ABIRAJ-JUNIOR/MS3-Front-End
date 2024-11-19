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

  pagination(pageNumber:number , pageSize:number){
    return this.http.get<any>(this.apiUrl + `/Course/Pagination/${pageNumber}/${pageSize}`)
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
  updatedDate:Date,
  shedulesCount:number,

  shedules:Shedule[]
}

export interface Shedule{
  id:string,
  courseid:string,
  startDate:Date,
  endDate:Date,
  duration:number,
  time:string,
  location:string,
  maxStudents:number,
  enrollCount:number,
  createdDate:Date,
  updatedDate:Date,
  scheduleStatus:number
}