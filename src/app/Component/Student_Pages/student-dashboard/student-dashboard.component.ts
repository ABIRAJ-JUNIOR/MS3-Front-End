import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet, RouterModule, Router } from "@angular/router";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { Announcement, Student } from "../../../Modals/modals";
import { StudentService } from "../../../Service/API/Student/student.service";
import { NotificationServiceService } from "../../../Service/API/Notification/notification-service.service";
import { ToastrService } from "ngx-toastr";
import { AnnouncementService } from "../../../Service/API/Announcement/announcement.service";
import { AuthService } from "../../../Service/API/Auth/auth.service";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule,],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  sidebarCollapsed = false;
  noImage: string = 'https://www.bing.com/ck/a?!&&p=7648fe0c3dc6be6b2188d54e324d5d9352d68f37b129c4ddaaaadf8174ec11a4JmltdHM9MTczMzAxMTIwMA&ptn=3&ver=2&hsh=4&fclid=1a548757-8fff-66c7-3ffe-93498efe67cc&u=a1L2ltYWdlcy9zZWFyY2g_cT1wcm9maWxlJTIwbm8lMjBpbWFnZSZGT1JNPUlRRlJCQSZpZD05MzAzNEM1QTRDQjMyOTE2NzIxNzM3Q0Y2NzE0NDI3NDU1MDRDRTMx&ntb=1';

  NotifyLength: number=0;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  StudentDetails: any;
  StudentTokenDetails: any;



  constructor(private LogoutService: AuthService, private anouncementService: AnnouncementService, private tostr: ToastrService, private NotificationSerivice: NotificationServiceService, private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService, private router: Router) {
  }

  ngOnInit(): void {
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

    this.StudentsLoad();
    this.notificationLoadItems()
    this.AnnouncementLoad();
    this.loadRecentAnnouncement();

  }

  Notifications: any;
  NotificationLength:number=0;
  notificationLoadItems() {

    this.NotificationSerivice.getAllNotificationsByStudentId(this.StudentTokenDetails.Id).subscribe({
      next: (response: any) => {
        this.Notifications = response
        this.NotificationLength=this.Notifications.length
      }, error: (error) => {
        console.log(error.message)
      }
    })
  }


  StudentsLoad() {
    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe({
      next: (student: Student) => {
        this.StudentDetails = student

      }, error: (error) => {
        console.log(error.message)
      }
    })

  }


  AnnouncementLength: number = 0;
  ResentAnnouncements:Announcement[] = []
  Announcements: Announcement[] = []

  AnnouncementLoad() {
    this.anouncementService.GetAllAnouncement().subscribe({
      next: (data: Announcement[]) => {
        this.Announcements = data
      }, complete: () => {
        console.log(this.Announcements);
        for (let i: any = 0; i < this.Announcements.length; i++) {
          const element = this.Announcements[i];
          if (element.isActive === true) {
            if (element.audienceType != "Admin") {
              this.AnnouncementLength++;
            }
          }

        }
        
      }, error: (error) => {
        console.log(error.message)
      }
    })
  }

  private loadRecentAnnouncement():void{
    this.anouncementService.GetRecentAnnouncements(2).subscribe({
      next:(res:Announcement[])=>{
        this.ResentAnnouncements = res
      }
    })
  }

  MarkAsRead(id: string) {
    this.NotificationSerivice.MarkAsReadNotication(id).subscribe({
      next: (data: any) => {
        this.tostr.success("Notification Read SuccessFully")
      }, error: (error) => {
        this.tostr.error("Notification read Failed try again Later")
      }, complete: () => {
        this.notificationLoadItems()
      }
    })

  }


  logoutDash() {
    this.LogoutService.logout()
    this.router.navigate([''])
  }


}
