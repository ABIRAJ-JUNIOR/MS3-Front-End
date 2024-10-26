import { Routes } from '@angular/router';
import { HomeComponent } from './Component/Landing_Pages/home/home.component';
import { ContactComponent } from './Component/Landing_Pages/contact/contact.component';
import { AdminLoginComponent } from './Component/Admin_Pages/admin-login/admin-login.component';
import { AboutComponent } from './Component/Landing_Pages/about/about.component';
import { StudentLoginComponent } from './Component/Student_Pages/student-login/student-login.component';

export const routes: Routes = [

    {path:'' , component:HomeComponent},
    {path:'home' , component:HomeComponent},
    {path:'contact' , component:ContactComponent},
    {path:'admin-login' , component:AdminLoginComponent},
    {path:'about' , component:AboutComponent},
    {path:'student-login' , component:StudentLoginComponent},

];
