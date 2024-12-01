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

  getAllStudentAssessment(){
    return this.http.get<StudentAssessment[]>(this.CommonUrl + '/StudentAssessment/GetAll')
  }
}