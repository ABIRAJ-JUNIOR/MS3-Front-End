import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'https://localhost:7044/api'

  signUp(student:SignUp){
    return this.http.post(`${this.apiUrl}/Auth/SignUp` , student)
  }
}

export interface SignUp{
  nic:string;
  firstName:string;
  lastName:string;
  dateOfBirth:Date;
  gender:number;
  email:string;
  phone:string;
  password:string;
}