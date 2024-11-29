import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssessmentRequest } from '../../../Component/Admin_Pages/course-assessment/course-assessment.component';
import { Assessment } from '../../../Modals/modals';

@Injectable({
  providedIn: 'root'
})
export class AssesmentService {

  constructor(private http:HttpClient) { }

  CommonUrl:string="https://localhost:7044/api";

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
    return this.http.post(this.CommonUrl + '/Assessment/Add', Assessment)
  }
  updateAssessment(id:string ,Assessment:AssessmentRequest){
    return this.http.put(this.CommonUrl + `/Assessment/Update/${id}`, Assessment)
  }
  
}
