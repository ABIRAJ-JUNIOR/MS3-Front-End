export interface Student {
  id: string;
  nic: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  phone: string;
  email:string;
  address: Address;
  imageUrl?:string;

  enrollments: Enrollment[];
  studentAssessments:StudentAssessment[]
}

export interface Address {
  id: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: number;
  country: string;
}

export interface Admin {
  id: string;
  nic: string;
  roleName:string;
  firstName: string;
  lastName: string;
  phone: string;
  email:string;
  imageUrl: string;
  auditLog: AuditLog[];
}

export interface AuditLog {
  id: string;
  action: string;
  actionDate: Date;
  details: string;
  adminId: string;
  adminResponse: Admin;
}

export interface Course {
  id: string;
  courseCategoryId: string;
  courseName: string;
  level: string;
  courseFee: number;
  description: string;
  prerequisites: string;
  imageUrl: string;
  createdDate: Date;
  updatedDate: Date;
  schedulesCount: number;
  feedBackRate:number;

  schedules: Schedule[];
  feedbacks:FeedBack[];
  assessmentResponse:Assessment[];
}

export interface Schedule {
  id: string;
  courseid: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  time: string;
  location: string;
  maxStudents: number;
  enrollCount: number;
  createdDate: Date;
  updatedDate: Date;
  scheduleStatus: string;

  courseResponse:Course;
}

export interface Enrollment {
    id:string;
    enrollmentDate:Date;
    paymentStatus:string;
    isActive:boolean;
    studentId:string;
    courseScheduleId:string;

    courseScheduleResponse:Schedule;
    paymentResponse:Payment[];
}



export interface Payment{
    id:string;
    enrollmentId:string;
    paymentType:string;
    paymentMethod:string;
    amountPaid:number;
    paymentDate:Date;
    installmentNumber:string;
}

export interface PaymentOverView{
  totalPayment:number;
  fullPayment:number;
  installment:number;
  overDue:number;
}


export interface Assessment {
    id:string;
    courseId:string;
    assessmentTitle:string;
    assessmentType:string;
    startDate:Date;
    endDate:Date;
    totalMarks:number;
    passMarks:number;
    assessmentLink:string;
    createdDate:Date;
    updateDate:Date;
    assessmentStatus:string;

    courseResponse:Course;
    studentAssessmentResponses:StudentAssessment[];
}

export interface StudentAssessment{
    id:string;
    studentId:string;
    assessmentId:string;
    marksObtaines:Int16Array;
    grade:string;
    feedBack:string;
    dateSubmitted:Date;
    dateEvaluated:Date;
    studentAssessmentStatus:string;

    assessmentResponse:Assessment;
    studentResponse:Student
}

export interface Notification{
    id:string;
    studentId:string;
    message:string;
    dateSent:Date;
    notificationType:string;
    isRead:boolean;
    isExpand:boolean;
}

export interface FeedBack{
    id:string;
    feedBackText:string;
    rating:number;
    feedBackDate:Date;
    studentId:string;
    courseId:string;

    student:Student;
    course:Course;
}

export interface ContactUs{
    id:string;
    name:string;
    email:string;
    message:string;
    response:string;
    dateSubmited:Date;
    isRead:boolean;
}

export interface Announcement{
    id:string;
    title:string;
    description:string;
    datePosted:Date;
    expirationDate:Date;
    audienceType:string;
    isActive:boolean;
}

export interface CourseCategory{
  id:string;
  categoryName:string;
  description:string;
}