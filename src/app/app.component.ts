import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { NetworkIssueComponent } from "./Component/common_components/network-issue/network-issue.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule, NetworkIssueComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IT_Institute_Course_Management_System';

  isLoading = false;

  constructor() {}

}
