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
import { StudentReportComponent } from './Component/Admin_Pages/student-report/student-report.component';
import { CourseScheduleComponent } from './Component/Admin_Pages/course-schedule/course-schedule.component';
import { CourseAssessmentComponent } from './Component/Admin_Pages/course-assessment/course-assessment.component';
import { adminAuthGuard } from './Guard/Admin/admin-auth.guard';
import { DashContentComponent } from './Component/Student_Pages/dash-content/dash-content.component';
import { PaymentGateComponent } from './Component/Landing_Pages/Payment/payment-gate/payment-gate.component';
import { payAuthGuard } from './Guard/Payment/pay-auth.guard';
import { OtpAuthenticationComponent } from './Component/Landing_Pages/otp-authentication/otp-authentication.component';
import { PaymentAuthenticationComponent } from './Component/Landing_Pages/payment-authentication/payment-authentication.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home' , pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'course', component: CourseComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: 'paymen-auth',
        component: PaymentAuthenticationComponent, children:[
            {
                path:'paymentgate',
                component:PaymentGateComponent
            },
            {
                path:'otp-auth',
                component:OtpAuthenticationComponent
            } 
        ],
        canActivate : [payAuthGuard]
    },
   


    {
        path: 'admin-dashboard', component: AdminDashboardComponent, children: [
            { path: '', redirectTo: 'home' ,pathMatch:'full' },
            { path: 'home', component: AdminHomeComponent },
            { path: 'student-list', component: StudentListComponent },
            { path: 'student-report/:id', component: StudentReportComponent },
            { path: 'admin-list', component: AdminListComponent },
            { path: 'audit-log', component: AuditLogComponent },
            { path: 'admin-profile', component: AdminProfileComponent },
            { path: 'course-list', component: CourseListComponent },
            { path: 'schedule-list', component: CourseScheduleComponent },
            { path: 'assessment-list', component: CourseAssessmentComponent },
            {path:'**' , redirectTo:'home',pathMatch:'full'}
        ],
        canActivate: [adminAuthGuard]
    },
    {
        path: 'student-dashboard', component: StudentDashboardComponent, children: [
            { path: '', component: DashContentComponent }
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
