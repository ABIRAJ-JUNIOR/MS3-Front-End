import { Component, afterNextRender } from '@angular/core';
import { Assessment, Course} from '../../../Modals/modals';
import { CourseService } from '../../../Service/Course/course.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-assessment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './course-assessment.component.html',
  styleUrl: './course-assessment.component.css'
})
export class CourseAssessmentComponent {
  assessments: Assessment[] = [];
  currentPage: number = 1;
  pageSize: number = 13;
  totalPages: number = 0;
  currentLength:number = 0;
  totalItems:number = 0;
  courses:Course[]=[]

  assessmentForm!: FormGroup;
  constructor(private courseService: CourseService,private fb: FormBuilder,private toastr:ToastrService) {
    this.assessmentForm = this.fb.group({
      courseId: ['', Validators.required],
      assessmentType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      totalMarks: ['', [Validators.required, Validators.min(0)]],
      passMarks: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadItems();
    this.courseService.getCourses().subscribe(data=>{
          this.courses=data
    })
  }


  loadItems(): void {
    this.courseService.assessmentPagination(this.currentPage , this.pageSize).subscribe({
      next:((response:any) => {
        this.assessments = response.items
        this.totalPages = response.totalPages
        this.totalItems = response.totalItem
      }),
      complete:() => {
        this.currentLength = this.assessments.length

      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadItems();
    }
    
  }

  onSubmit() {
    if (this.assessmentForm.valid) {
      const data=this.assessmentForm.value
      data.assessmentType=Number(data.assessmentType)
      const assessment: AssessmentRequest = 
      {

        courseId:data.courseId,
        assessmentType:data.assessmentType,
        startDate:data.startDate,
        endDate:data.endDate,
        totalMarks:data.totalMarks,
        passMarks:data.passMarks
      }
      this.courseService.addAssessment(assessment).subscribe( {
        next:(res:any)=>{
       

        },
        complete:()=> {
          this.toastr.success("Add Successfull" , "" , {
            positionClass:"toast-top-right",
            progressBar:true,
            timeOut:3000
          })
          this.assessmentForm.reset()
          this.loadItems()

        },
        error:(err:any)=>
          {
            this.toastr.warning(err.error , "" , {
              positionClass:"toast-top-right",
              progressBar:true,
              timeOut:3000
            })

          }
      })
      console.log(this.assessmentForm.value);
    }
  }

  
}

export interface AssessmentRequest{
  courseId:string;
  assessmentType:Number;
  startDate:string;
  endDate:string;
  totalMarks:Number;
  passMarks:Number;
} 
