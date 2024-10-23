import { Routes } from '@angular/router';
import { HomeComponent } from './Component/Landing_Page/home/home.component';
import { ContactComponent } from './Component/Landing_Page/contact/contact.component';

export const routes: Routes = [

    {path:'' , component:HomeComponent},
    {path:'home' , component:HomeComponent},
    {path:'contact' , component:ContactComponent},
];
