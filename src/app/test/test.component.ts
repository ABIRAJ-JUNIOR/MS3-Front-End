import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
 
}
  

