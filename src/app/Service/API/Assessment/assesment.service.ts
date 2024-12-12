import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssessmentRequest } from '../../../Component/Admin_Pages/course-assessment/course-assessment.component';
import { Assessment } from '../../../Modals/modals';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AssesmentService {
  
  constructor(private http:HttpClient) { }

  CommonUrl:string=environment.apiUrl;

  getPagination(pagenumber:number , pageSize:number){
    return this.http.get(this.CommonUrl + `/Assessment/Pagination/${pagenumber}/${pageSize}`)
  }
  getAllAssesment(){
    return this.http.get<Assessment[]>(this.CommonUrl+"/Assessment/GetAll")
  }
  assessmentPagination(pageNumber:number , pageSize:number){
    return this.http.get<any>(this.CommonUrl + `/Assessment/Pagination/${pageNumber}/${pageSize}`)
  }
  addAssessment(Assessment:AssessmentRequest){
    return this.http.post<Assessment>(this.CommonUrl + '/Assessment/Add', Assessment)
  }
  updateAssessment(id:string ,Assessment:AssessmentRequest){
    return this.http.put<Assessment>(this.CommonUrl + `/Assessment/Update/${id}`, Assessment)
  }

}
