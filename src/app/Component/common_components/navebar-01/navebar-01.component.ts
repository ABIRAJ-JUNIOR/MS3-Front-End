import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopinfoComponent } from '../topinfo/topinfo.component';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navebar-01',
  standalone: true,
  imports: [RouterModule,TopinfoComponent],
  templateUrl: './navebar-01.component.html',
  styleUrl: './navebar-01.component.css'
})
export class Navebar01Component {
  isAdmin!:boolean;
  isStudent!:boolean;

  sidebarCollapsed = false;

  constructor(){
   const token:string = localStorage.getItem("token")!;
   const decode:any = jwtDecode(token)

   if(decode.Role == "Administrator" || decode.Role == "Instructor"){
    this.isAdmin = true
    this.isStudent = false
   }if(decode.Role =="Student"){
    this.isAdmin = false
    this.isStudent = true
   }

  }


  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }




}
