import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet, RouterModule, Router } from "@angular/router";
import { StudentDashDataService } from "../../../Service/Data/Student_Data/student-dash-data.service";
import { Student } from "../../../Modals/modals";
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
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  StudentDetails: any;
  StudentTokenDetails: any;
  typeCheck:string="Students"



  constructor(private LogoutService:AuthService, private anouncementService: AnnouncementService, private tostr: ToastrService, private NotificationSerivice: NotificationServiceService, private StudentDashDataService: StudentDashDataService, private StudentApiService: StudentService, private router: Router) {
  }

  ngOnInit(): void {

    this.NotficationLoad();
    this.AnnouncementLoad();

  }
  NotificationLength:number=0;
  NotficationLoad() {
    this.StudentTokenDetails = this.StudentDashDataService.GetStudentDeatilByLocalStorage();

    this.StudentApiService.getStudent(this.StudentTokenDetails.Id).subscribe((student: Student) => {
      this.StudentDetails = student
      for (let i: any = 0; i < this.StudentDetails.notification.length; i++) {
        const element = this.StudentDetails.notification[i];
        if (element.isRead == false) {
         this.NotificationLength++;
        }

      }
      console.log(this.StudentDetails)
    },
      (error) => {
        this.router.navigate([''])
      }, () => {
      })

  }
  AnnouncementLength: number = 0;
  Announcements: any[] = []
  AnnouncementLoad() {
    this.anouncementService.GetAllAnouncement().subscribe((data: any) => {
      this.Announcements = data
      for (let i: any = 0; i < this.Announcements.length; i++) {
        const element = this.Announcements[i];
        if (element.isActive === true) {
          if (element.audienceType == "Students"){
            this.AnnouncementLength++;
          }
        }

      }
    })
  }

  MarkAsRead(id: string) {
    console.log(id)
    this.NotificationSerivice.MarkAsReadNotication(id).subscribe((data: any) => {
      this.tostr.success("Notification Read SuccessFully")
      this.NotficationLoad()
    }, (error) => {
      console.log((error))
      this.tostr.error(error.message)
    })
  }


  logoutDash(){
    this.LogoutService.logout()
    this.refreshPage();
  }
  refreshPage(): void {
    window.location.reload();
  }
}
