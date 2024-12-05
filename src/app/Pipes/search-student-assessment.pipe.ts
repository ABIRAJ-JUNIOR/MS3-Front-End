import { Pipe, PipeTransform } from '@angular/core';
import { StudentAssessment } from '../Modals/modals';

@Pipe({
  name: 'searchStudentAssessment',
  standalone: true
})
export class SearchStudentAssessmentPipe implements PipeTransform {

  transform(studentAssessments: StudentAssessment[], ...args: string[]): StudentAssessment[] {
    let searchTest:string = args[0]

    if(searchTest == 'Evaluated'){
      return studentAssessments.filter(sa => sa.marksObtaines != null);
    }

    if(searchTest == 'NotEvaluate'){
      return studentAssessments.filter(sa => sa.marksObtaines == null);
    }

    if(searchTest != ''){
      return studentAssessments.filter(sa => sa.assessmentResponse.courseResponse.courseName == searchTest)
    }else{
      return studentAssessments
    }
  }

}
