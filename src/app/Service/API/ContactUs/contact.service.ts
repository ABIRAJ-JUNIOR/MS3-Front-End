import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactUs } from '../../../Modals/modals';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http:HttpClient) { }

  private apiUrl = 'https://localhost:7044/api'

  addContactDetails(contact:ContactUs){
    return this.http.post( this.apiUrl + '/ContactUs', contact)
  }

  getAllContactMessages(){
    return this.http.get<ContactUs[]>(this.apiUrl + '/ContactUs')
  }

  addResponse(Response:any){
    return this.http.put(this.apiUrl + '/ContactUs' , Response)
  }

  deleteMessage(id:string){
    return this.http.delete(this.apiUrl + '/ContactUs/Delete/' + id)
  }
}