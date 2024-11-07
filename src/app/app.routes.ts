import { Routes } from '@angular/router';
import { HomeComponent } from './Component/Landing_Pages/home/home.component';
import { ContactComponent } from './Component/Landing_Pages/contact/contact.component';
import { AboutComponent } from './Component/Landing_Pages/about/about.component';
import { AdminDashboardComponent } from './Component/Admin_Pages/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './Component/Admin_Pages/admin-home/admin-home.component';
import { SignupComponent } from './Component/Landing_Pages/signup/signup.component';
import { SigninComponent } from './Component/Landing_Pages/signin/signin.component';

export const routes: Routes = [

    {path:'' , component:HomeComponent},
    {path:'home' , component:HomeComponent},
    {path:'contact' , component:ContactComponent},
    {path:'about' , component:AboutComponent},
    {path:'signin' , component:SigninComponent},
    {path:'signup' , component:SignupComponent},

    {
        path:'admin-dashboard', component:AdminDashboardComponent , children:[
            {path:'', component:AdminHomeComponent},
            {path:'home', component:AdminHomeComponent},
        ]
    }

    

];
