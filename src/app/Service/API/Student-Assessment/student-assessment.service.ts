import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { StudentAssessment } from '../../../Modals/modals';

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

  getAllEvaluvatedAssessments(){
    return this.http.get<StudentAssessment[]>(this.CommonUrl + '/StudentAssessment/Evaluated');
  }

  getAllNonEvaluateAssessments(){
    return this.http.get<StudentAssessment[]>(this.CommonUrl + '/StudentAssessment/Non-Evaluate');
  }

  evaluateAssessment(id:string,data:any){
    return this.http.put(this.CommonUrl + `/StudentAssessment/Evaluate-Assessment/${id}` , data,{
      responseType:'text'
    });
  }
}