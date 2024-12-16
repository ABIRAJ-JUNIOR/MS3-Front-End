import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { environment } from '../../../../environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http:HttpClient,
    private readonly router:Router  
  ) { }

  private apiUrl = environment.apiUrl

  signUp(student:SignUp){
    return this.http.post(`${this.apiUrl}/Auth/SignUp` , student,{
      responseType:'text'
    })
  }

  signIn(auth:SignIn){
    return this.http.post(`${this.apiUrl}/Auth/SignIn`, auth,{
      responseType:'text'
    })
  }

  emailVerify(userId:string){
    return this.http.get(`${this.apiUrl}/Auth/Verify/${userId}`,{
      responseType:'text'
    })
  }

  isLoggedInAdmin():boolean{
    const token = localStorage.getItem("token");
    if(token == null){
      return false
    }
    const decode:any =jwtDecode(token)
    if(decode.Role == "Administrator" || decode.Role == "Instructor"){  
      return true
    }else{
      return false
    }
  }

  isLoggedInStudent():boolean{
    const token:string = localStorage.getItem("token")!;
    if(token == null){
      return false
    }
    const decode:any = jwtDecode(token)
    if(decode.Role == "Student"){  
      return true
    }else{
      return false
    }
  }

  IsPaymentInStudent():boolean{
    let payCourse:any=localStorage.getItem("PurchaseCourse")
    if (payCourse) {
      return true
    }else{
      return false
    }
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("PurchaseCourse");
    this.router.navigate(['/Way/home'])
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