import { Component, OnInit } from '@angular/core';
import { Admin, AdminService, AuditLog } from '../../../Service/Admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './audit-log.component.html',
  styleUrl: './audit-log.component.css'
})
export class AuditLogComponent implements OnInit {

  auditLog:AuditLog[] = []
  constructor(private adminService:AdminService){}
  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.adminService.getAuditLogs().subscribe({
      next:((response:AuditLog[]) => {
        this.auditLog = response
      }),
      complete:() => {
      }
    });
  }
}
