import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeedBack } from '../../../Modals/modals';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {

  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  SendFeedback(formData:FormData) {
    return this.http.post(this.apiUrl+"/Feedbacks",formData)
  }

  getTopFeedBacks(){
    return this.http.get<FeedBack[]>(this.apiUrl + "/Feedbacks/TopFeedBacks")
  }

  getFeedbackByStudentId(id:string){
    return this.http.get<FeedBack[]>(this.apiUrl + `/Feedbacks/Student/${id}`)
  }

  pagination(pageNumber:number , pageSize:number){
    return this.http.get<any>(this.apiUrl + `/Feedbacks/Pagination/${pageNumber}/${pageSize}`)
  }
  
}
