import { Routes } from '@angular/router';
import { HomeComponent } from './Component/Landing_Page/home/home.component';
import { ContactComponent } from './Component/Landing_Page/contact/contact.component';
import { AdminLoginComponent } from './Component/Admin_Pages/admin-login/admin-login.component';

export const routes: Routes = [

    {path:'' , component:HomeComponent},
    {path:'home' , component:HomeComponent},
    {path:'contact' , component:ContactComponent},
    {path:'admin-login' , component:AdminLoginComponent},

];
