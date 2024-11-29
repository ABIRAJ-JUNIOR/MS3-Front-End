import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assessment } from '../Modals/modals';

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
    return this.http.get(this.CommonUrl+"/Assessment/Assessments")
  }
 
}
