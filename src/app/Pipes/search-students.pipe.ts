import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../Modals/modals';

@Pipe({
  name: 'searchStudents',
  standalone: true
})
export class SearchStudentsPipe implements PipeTransform {

  transform(students: Student[], ...args: string[]): Student[] {
    let searchTest:string = args[0]
    return students.filter(s => s.nic.toLowerCase().includes(searchTest.toLowerCase()) || s.firstName.toLowerCase().includes(searchTest.toLowerCase()) || s.lastName.toLowerCase().includes(searchTest.toLowerCase()))
  }

}
