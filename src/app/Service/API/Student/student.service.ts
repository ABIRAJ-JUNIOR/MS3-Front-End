import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StudentReqest } from "../../../Component/Admin_Pages/student-list/student-list.component";
import { StudenUpdateRequest } from "../../../Component/Student_Pages/student-setting/student-setting.component";
import { Student } from "../../../Modals/modals";
import { environment } from "../../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  private apiUrl = environment.apiUrl

  getStudents(){
    return this.http.get<Student[]>(this.apiUrl + '/Student/getall')
  }

  getStudent(id:string){
    return this.http.get<Student>(this.apiUrl + '/Student/' + id)
  }
  addStudent(Student:StudentReqest){
    return this.http.post(this.apiUrl + '/Student/student', Student)
  }
  addImage(studentId:string,image:any){
    return this.http.post(this.apiUrl + `/Student/Image/${studentId}`,image,{
      responseType:'text'
    });
  }
  deleteStudent(studentId:string){
    return this.http.delete(this.apiUrl + `/Student/delete/${studentId}`,{
      responseType:'text'
    })
  }
  updateFullDetails(studentId:string , student:StudentReqest){
    return this.http.put(this.apiUrl + `/Student/Update-Full-Details/${studentId}` , student)
  }
  pagination(pageNumber:number , pageSize:number){
    return this.http.get(this.apiUrl + `/Student/Pagination/${pageNumber}/${pageSize}`)
  }

  updateStudent(studentId:string,student:StudenUpdateRequest){
    return this.http.put(this.apiUrl +"/Student/Update-Personal-Details/"+studentId,student)
  }

  UpdateStudentPersonalInfo(studentId:string , student:StudenUpdateRequest){
    return this.http.put(this.apiUrl + `/Student/Update-info-Details/${studentId}` , student)
  }

  ChangePassword( StudentId:string,auth:any){
    return this.http.put(this.apiUrl + `/Student/changeStudentPassword/${StudentId}`, auth , {responseType:'text'})
  }
}



