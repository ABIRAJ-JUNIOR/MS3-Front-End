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
import { StudentProfileComponent } from './Component/Student_Pages/student-profile/student-profile.component';
import { StudentSettingComponent } from './Component/Student_Pages/student-setting/student-setting.component';
import { StudentAssesmentComponent } from './Component/Student_Pages/student-assesment/student-assesment.component';
import { StudentCourseComponent } from './Component/Student_Pages/student-course/student-course.component';
import { StudentMycoursesComponent } from './Component/Student_Pages/student-mycourses/student-mycourses.component';
import { StudentCompletedcoursesComponent } from './Component/Student_Pages/student-completedcourses/student-completedcourses.component';
import { StudentResultComponent } from './Component/Student_Pages/student-result/student-result.component';
import { StudentPaymentsComponent } from './Component/Student_Pages/student-payments/student-payments.component';
import { StudentPaymentsHistoryComponent } from './Component/Student_Pages/student-payments-history/student-payments-history.component';
import { TestComponent } from './test/test.component';
import { AnnouncementComponent } from './Component/Admin_Pages/announcement/announcement.component';
import { ContactUsComponent } from './Component/Admin_Pages/contact-us/contact-us.component';
import { studentAuthGuard } from './Guard/Student/student-auth.guard';
import { StudentAssessmentsComponent } from './Component/Admin_Pages/student-assessments/student-assessments.component';
import { PaymentsOverviewComponent } from './Component/Admin_Pages/payments-overview/payments-overview.component';
import { ViewAllAnnouncementComponent } from './Component/common_components/view-all-announcement/view-all-announcement.component';
import { AccountSettingComponent } from './Component/Admin_Pages/account-setting/account-setting.component';
import { InvoiceComponent } from './Component/common_components/invoice/invoice.component';
import { CourseSechdulesComponent } from './Component/Landing_Pages/course-sechdules/course-sechdules.component';
import { BiomatricsComponent } from './Component/common_components/biomatrics/biomatrics.component';
import { EmailVerifiedComponent } from './Component/common_components/email-verified/email-verified.component';
import { LoginComponent } from './Component/Landing_Pages/login/login.component';
import { ResetPasswordComponent } from './Component/Landing_Pages/reset-password/reset-password.component';
import { ResetOtpComponent } from './Component/Landing_Pages/reset-otp/reset-otp.component';
import { CourseFeedbacksComponent } from './Component/Admin_Pages/course-feedbacks/course-feedbacks.component';
import { SearchPageComponent } from './Component/Landing_Pages/search-page/search-page.component';
import { NotificationComponent } from './Component/common_components/notification/notification.component';
import { HomeProfileComponent } from './Component/Landing_Pages/home-profile/home-profile.component';



export const routes: Routes = [
    { path: '', redirectTo: 'Way', pathMatch: 'full' },
    {
        path: 'Way', component:TestComponent,children:[
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'course', component: CourseComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'about', component: AboutComponent },
            { path: 'profile', component: HomeProfileComponent },
            { path: 'bio', component: BiomatricsComponent },
        ]
    },
    { path: 'course-sechdule/:courseId', component: CourseSechdulesComponent },
    {
        path: 'signin', component: SigninComponent, children: [
            { path: '', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'reset', component: ResetPasswordComponent },
            { path: 'reset-otp/:email', component: ResetOtpComponent }
        ]
    },
    { path: 'email-verified/:id', component: EmailVerifiedComponent },
    {
        path: 'paymen-auth',
        component: PaymentAuthenticationComponent,
        canActivate: [payAuthGuard],
        children: [
            { path: 'paymentgate', component: PaymentGateComponent },
            { path: 'otp-auth', component: OtpAuthenticationComponent }
        ]
    },
    { path: 'search/:name', component: SearchPageComponent },
    // Admin Dashboard Routes
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [adminAuthGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: AdminHomeComponent },
            { path: 'student-list', component: StudentListComponent },
            { path: 'student-report/:id', component: StudentReportComponent },
            { path: 'admin-list', component: AdminListComponent },
            { path: 'audit-log', component: AuditLogComponent },
            { path: 'admin-profile', component: AdminProfileComponent },
            { path: 'course-list', component: CourseListComponent },
            { path: 'schedule-list', component: CourseScheduleComponent },
            { path: 'assessment-list', component: CourseAssessmentComponent },
            { path: 'announcement', component: AnnouncementComponent },
            { path: 'contact-us', component: ContactUsComponent },
            { path: 'student-assessments', component: StudentAssessmentsComponent },
            { path: 'payment-overview', component: PaymentsOverviewComponent },
            { path: 'all-announcement/:Role', component: ViewAllAnnouncementComponent },
            { path: 'account-settings', component: AccountSettingComponent },
            { path: 'invoice', component: InvoiceComponent },
            { path: 'course-feedbacks', component: CourseFeedbacksComponent },
            { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ]
    },

    // Student Dashboard Routes
    {
        path: 'student-dashboard',
        component: StudentDashboardComponent,
        canActivate: [studentAuthGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: DashContentComponent },
            { path: 'profile', component: StudentProfileComponent },
            { path: 'setting', component: StudentSettingComponent },
            { path: 'assesment', component: StudentAssesmentComponent },
            { path: 'courses', component: StudentCourseComponent },
            { path: 'mycourses', component: StudentMycoursesComponent },
            { path: 'completed-Courses', component: StudentCompletedcoursesComponent },
            { path: 'assesment-result', component: StudentResultComponent },
            { path: 'enrollCourse-payment', component: StudentPaymentsComponent },
            { path: 'enrollCourse-paymentHistory', component: StudentPaymentsHistoryComponent },
            { path: 'all-announcement/:Role', component: ViewAllAnnouncementComponent },
            { path: 'notification', component: NotificationComponent },
            { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

