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

  signIn(auth:SignIn){
    return this.http.post(`${this.apiUrl}/Auth/SignIn`, auth,{
      responseType:'text'
    })
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

export interface SignIn{
  email:string;
  password:string;
}