import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, Schedule } from '../../Modals/modals';
import { CourseRequest } from '../../Component/Admin_Pages/course-list/course-list.component';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'https://localhost:7044/api'

  getCourses(){
    return this.http.get<Course[]>(this.apiUrl + '/Course/Course')
  }

  getCourseByID(Id:string){
    return this.http.get<Course>(this.apiUrl + '/Course/CourseById/' + Id)
  }

  pagination(pageNumber:number , pageSize:number){
    return this.http.get<any>(this.apiUrl + `/Course/Pagination/${pageNumber}/${pageSize}`)
  }

  schedulePagination(pageNumber:number , pageSize:number){
    return this.http.get<any>(this.apiUrl + `/CourseSchedule/Pagination/${pageNumber}/${pageSize}`)
  }

  assessmentPagination(pageNumber:number , pageSize:number){
    return this.http.get<any>(this.apiUrl + `/Assessment/Pagination/${pageNumber}/${pageSize}`)
  }
  addCourseSchedule(CourseSchedule:any){
    return this.http.post<Schedule>(this.apiUrl + '/CourseSchedule', CourseSchedule)
  }
  GetAllCategory(){
    return this.http.get<any>(this.apiUrl + '/CourseCategory/GetAllCategory')
  }
  AddCourse(Course:CourseRequest){
    return this.http.post<Course>(this.apiUrl + '/Course/Course', Course)
  }
}
