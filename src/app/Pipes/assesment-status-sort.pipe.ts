import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assesmentStatusSort',
  standalone: true
})
export class AssesmentStatusSortPipe implements PipeTransform {

  transform(value: any[]): any[] {
    if (!value || value.length === 0) {
      return value;
    }
    const priority:any = {
      inprogress: 0,
      notstarted: 1,
      completed: 2,
    };
    console.log(value)

    // Sort based on priority values
    return value.sort((a, b) => {
      // Convert status to lowercase to ensure case-insensitivity
      const statusA = a.assessmentStatus.toLowerCase();
      const statusB = b.assessmentStatus.toLowerCase();
      console.log(statusA , statusB)

      return priority[statusA] - priority[statusB];
    });

  }

}
