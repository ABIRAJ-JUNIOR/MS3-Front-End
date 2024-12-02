import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {

  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  SendFeedback(formData:FormData) {
    return this.http.post(this.apiUrl+"/Feedbacks",formData)
  }


}
