import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentAssessment } from '../../../Modals/modals';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StudentAssessmentService {
  constructor(private http:HttpClient) { }

  CommonUrl:string=environment.apiUrl;

  addStudentAssessment(Data:any){
    return this.http.post(this.CommonUrl + '/StudentAssessment',Data);
  }

  getAllStudentAssessment(){
    return this.http.get<StudentAssessment[]>(this.CommonUrl + '/StudentAssessment/GetAll');
  }

  getAllAssesmentByStudentid(id:string){
    return this.http.get<StudentAssessment[]>(this.CommonUrl + `/StudentAssessment/studentAssesment/${id}`);
  }

  evaluateAssessment(id:string,data:any){
    return this.http.put<StudentAssessment>(this.CommonUrl + `/StudentAssessment/Evaluate-Assessment/${id}` , data);
  }

  getPaginationByStudentId(studentId:string,pageNumber:number,pageSize:number){
    return this.http.get<StudentAssessment>(this.CommonUrl+`/StudentAssessment/getByPagination/${studentId}?PageNumber=${pageNumber}&PageSize=${pageSize}`)
  }

}