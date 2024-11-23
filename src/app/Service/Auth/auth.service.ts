import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

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

  isLoggedInAdmin():boolean{
    const token:string = localStorage.getItem("token")!;
    const decode:any = jwtDecode(token)
    if(decode.Role == "Administrator" || decode.Role == "Instructor"){  
      return true
    }else{
      return false
    }
  }

  isLoggedInStudent():boolean{
    const token:string = localStorage.getItem("token")!;
    const decode:any = jwtDecode(token)
    if(decode.Role == "Student"){  
      return true
    }else{
      return false
    }
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