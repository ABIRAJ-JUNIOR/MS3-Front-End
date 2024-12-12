import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, CourseCategory, Schedule } from '../../../Modals/modals';
import { CourseRequest } from '../../../Component/Admin_Pages/course-list/course-list.component';
import { CourseScheduleRequest } from '../../../Component/Admin_Pages/course-schedule/course-schedule.component';
import { AssessmentRequest } from '../../../Component/Admin_Pages/course-assessment/course-assessment.component';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  private apiUrl = environment.apiUrl

  //Course
  getCourses(){
    return this.http.get<Course[]>(this.apiUrl + '/Course/GetAll')
  }
  getCourseByID(Id:string){
    return this.http.get<Course>(this.apiUrl + '/Course/GetById/' + Id)
  }
  pagination(pageNumber:number , pageSize:number){
    return this.http.get<any>(this.apiUrl + `/Course/Pagination/${pageNumber}/${pageSize}`)
  }
  AddCourse(Course:CourseRequest){
    return this.http.post<Course>(this.apiUrl + '/Course/Add', Course)
  }
  updateCourse(id:string ,Course:CourseRequest){
    return this.http.put<Course>(this.apiUrl + `/Course/Update/${id}`, Course)
  }
  Addimage(CourseID:string,image:any){
    return this.http.post(this.apiUrl + '/Course/image/' + CourseID, image,{
      responseType:'text'
    })
  }
  deleteCourse(CourseId:string){
    return this.http.delete(this.apiUrl + '/Course/Delete/' + CourseId,{
      responseType:'text'
    })
  }
  getTop3Courses(){
    return this.http.get<Course[]>(this.apiUrl + '/Course/Top3')
  }

  SearchCourse(data:any){
    return this.http.get<any>(this.apiUrl + `/Course/Search?searchText=${data}`)
  }


  //Course Schedule
  schedulePagination(pageNumber:number , pageSize:number){
    return this.http.get<any>(this.apiUrl + `/CourseSchedule/Pagination/${pageNumber}/${pageSize}`)
  }
  addCourseSchedule(CourseSchedule:CourseScheduleRequest){
    return this.http.post<Schedule>(this.apiUrl + '/CourseSchedule', CourseSchedule)
  }
  updateCourseSchedule(id:string ,CourseSchedule:CourseScheduleRequest){
    return this.http.put<Schedule>(this.apiUrl + `/CourseSchedule/Update/${id}`, CourseSchedule)
  }

  //Assessment
  assessmentPagination(pageNumber:number , pageSize:number){
    return this.http.get<any>(this.apiUrl + `/Assessment/Pagination/${pageNumber}/${pageSize}`)
  }
  addAssessment(Assessment:AssessmentRequest){
    return this.http.post(this.apiUrl + '/Assessment/Assessment', Assessment)
  }

  //Course Category
  GetAllCategory(){
    return this.http.get<CourseCategory[]>(this.apiUrl + '/CourseCategory/GetAllCategory')
  }


}
