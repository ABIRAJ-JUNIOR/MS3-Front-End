import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../Modals/modals';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'https://localhost:7044/api'

  getStudents(){
    return this.http.get<Student[]>(this.apiUrl + '/Student/getall')
  }

  getStudent(id:string){
    return this.http.get<Student>(this.apiUrl + '/Student/' + id)
  }
  addStudent(Student:FormData){
    return this.http.post<Student>(this.apiUrl + '/Student/student', Student)
  }

  pagination(pageNumber:number , pageSize:number){
    return this.http.get(this.apiUrl + `/Student/Pagination/${pageNumber}/${pageSize}`)
  }
}



