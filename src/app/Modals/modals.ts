export interface Student {
  id: string;
  nic: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  phone: string;
  address: Address;

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
  firstName: string;
  lastName: string;
  phone: string;
  imagePath: string;
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
  imagePath: string;
  createdDate: Date;
  updatedDate: Date;
  shedulesCount: number;

  shedules: Shedule[];
}

export interface Shedule {
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
  scheduleStatus: number;
}

export interface Enrollment {
    id:string;
    enrollmentDate:Date;
    paymentStatus:string;
    isActive:boolean;
    studentId:string;
    CourseSheduleId:string;
}

export interface Payment{
    id:string;
    enrollmentId:string;
    paymentType:string;
    paymentMethod:string;
    AmountPaid:number;
    paymentDate:Date;
    imagePath:string;
    installmentNumber:string;
}

export interface Assessment {
    id:string;
    courseId:string;
    assessmentType:string;
    startDate:Date;
    endDate:Date;
    totalMarks:number;
    passMarks:number
    createdDate:Date;
    UpdateDate:Date;
    Status:string;
}

export interface StudentAssessment{
    id:string;
    studentId:string;
    assessmentId:string;
    markObtaines:Int16Array;
    grade:string;
    feedBack:string;
    dateSubmitted:Date;
    dateEvaluated:Date;
    studentAssessmentStatus:string;
}