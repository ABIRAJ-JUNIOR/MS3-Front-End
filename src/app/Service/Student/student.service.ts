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
    return this.http.get(this.apiUrl + `/Pagination/${pageNumber}/${pageSize}`)
  }
}

export interface Student{
  id:string,
  nic:string,
  firstName:string,
  lastName:string,
  dateOfBirth:Date
  gender:string,
  phone:string,
  address:Address
}

export interface Address{
  id:string,
  addressLine1:string,
  addressLine2:string,
  city:string,
  postalCode:number,
  country:string
}


