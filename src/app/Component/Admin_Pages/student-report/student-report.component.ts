import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-report.component.html',
  styleUrl: './student-report.component.css'
})
export class StudentReportComponent {
  studentData = {
    personalInfo: {
      name: 'John Doe',
      studentId: '123456',
      email: 'johndoe@example.com',
      phone: '+1 234-567-890',
      address: '123, Main Street, City, Country',
      nic: '987654321V',
      gender: 'Male',
      dob: '12 Jan 2000',
    },
    enrolledCourses: [
      { name: 'Web Development', level: 'Beginner', duration: '3 Months', fee: '$500' },
      { name: 'Data Science', level: 'Intermediate', duration: '6 Months', fee: '$1000' },
    ],
    payments: [
      { date: '01 Jan 2024', amount: '$500', method: 'Credit Card', status: 'Paid' },
      { date: '01 Mar 2024', amount: '$1000', method: 'Bank Transfer', status: 'Pending' },
    ],
    attemptedAssessments: [
      { name: 'HTML Basics', course: 'Web Development', score: '85%', date: '15 Jan 2024' },
      { name: 'Data Cleaning', course: 'Data Science', score: '90%', date: '20 Mar 2024' },
    ],
  };

  downloadReport() {
    const reportData = {
      Personal_Information: this.studentData.personalInfo,
      Enrolled_Courses: this.studentData.enrolledCourses,
      Payments: this.studentData.payments,
      Attempted_Assessments: this.studentData.attemptedAssessments,
    };

    const reportString = JSON.stringify(reportData, null, 2);

    const blob = new Blob([reportString], { type: 'application/json' });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.studentData.personalInfo.name}_Report.json`; 
    document.body.appendChild(a);

    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  }
}
