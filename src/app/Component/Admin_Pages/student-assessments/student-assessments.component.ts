import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Course, CourseCategory, Schedule } from '../../../Modals/modals';
import { CourseService } from '../../../Service/API/Course/course.service';
import { CourseRequest } from '../course-list/course-list.component';

@Component({
  selector: 'app-student-assessments',
  standalone: true,
  imports: [CommonModule,FormsModule],
  providers: [BsModalService],
  templateUrl: './student-assessments.component.html',
  styleUrl: './student-assessments.component.css'
})
export class StudentAssessmentsComponent {

  // Modal-related variables
  modalRef?: BsModalRef;

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {

  }

}
