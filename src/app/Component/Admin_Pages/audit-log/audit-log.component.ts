import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditLog } from '../../../Modals/modals';
import { AuditlogService } from '../../../Service/API/AuditLog/auditlog.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SearchAuditLogsPipe } from '../../../Pipes/search-audit-logs.pipe';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule,FormsModule,BsDatepickerModule,SearchAuditLogsPipe],
  templateUrl: './audit-log.component.html',
  styleUrl: './audit-log.component.css'
})
export class AuditLogComponent implements OnInit {
  auditLog:AuditLog[] = []
  filterDate!:Date
  constructor(private auditLogService:AuditlogService){}
  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.auditLogService.getAuditLogs().subscribe({
      next:((response:AuditLog[]) => {
        this.auditLog = response
      }),
      complete:() => {
      }
    });
  }
}
