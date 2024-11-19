import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'https://localhost:7044/api/Student'

  getStudents(){
    return this.http.get<Student[]>(this.apiUrl + '/getall')
  }

  pagination(pageNumber:number , pageSize:number){
    return this.http.get(this.apiUrl + `/Pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
}

export interface Student{
  id:number,
  nic:string,
  firstName:string,
  lastName:string,
  gender:string,
  email:string,
  phone:string,
  password:string,
  address:Address
}

export interface Address{
  id:string,
  addressLine1:string,
  addressLine2:string,
  city:string,
  country:string
}


