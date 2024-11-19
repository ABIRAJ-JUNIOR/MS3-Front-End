import { Routes } from '@angular/router';
import { HomeComponent } from './Component/Landing_Pages/home/home.component';
import { ContactComponent } from './Component/Landing_Pages/contact/contact.component';
import { AboutComponent } from './Component/Landing_Pages/about/about.component';
import { AdminDashboardComponent } from './Component/Admin_Pages/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './Component/Admin_Pages/admin-home/admin-home.component';
import { SignupComponent } from './Component/Landing_Pages/signup/signup.component';
import { SigninComponent } from './Component/Landing_Pages/signin/signin.component';
import { StudentDashboardComponent } from './Component/Student_Pages/student-dashboard/student-dashboard.component';
import { StudentListComponent } from './Component/Admin_Pages/student-list/student-list.component';
import { AdminListComponent } from './Component/Admin_Pages/admin-list/admin-list.component';
import { AuditLogComponent } from './Component/Admin_Pages/audit-log/audit-log.component';
import { CourseComponent } from './Component/Landing_Pages/course/course.component';
import { AdminProfileComponent } from './Component/Admin_Pages/admin-profile/admin-profile.component';
import { CourseListComponent } from './Component/Admin_Pages/course-list/course-list.component';

export const routes: Routes = [

    {path:'' , component:HomeComponent},
    {path:'home' , component:HomeComponent},
    {path:'course',component:CourseComponent},
    {path:'contact' , component:ContactComponent},
    {path:'about' , component:AboutComponent},
    {path:'signin' , component:SigninComponent},
    {path:'signup' , component:SignupComponent},

    {
        path:'admin-dashboard', component:AdminDashboardComponent , children:[
            {path:'', component:AdminHomeComponent},
            {path:'home', component:AdminHomeComponent},
            {path:'student-list', component:StudentListComponent},
            {path:'admin-list', component:AdminListComponent},
            {path:'audit-log', component:AuditLogComponent},
            {path:'admin-profile', component:AdminProfileComponent},
            {path:'course-list', component:CourseListComponent},
        ]

    },
    {
        path:'student-dashboard', component:StudentDashboardComponent , children:[

        ]
    }
];
