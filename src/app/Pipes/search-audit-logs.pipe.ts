import { Pipe, PipeTransform } from '@angular/core';
import { AuditLog } from '../Modals/modals';

@Pipe({
  name: 'searchAuditLogs',
  standalone: true,
})
export class SearchAuditLogsPipe implements PipeTransform {
  transform(auditLogs: AuditLog[], searchDate: Date | null): AuditLog[] {
    if (!auditLogs || !searchDate) {
      return auditLogs || [];
    }

    const formattedSearchDate = searchDate.toISOString().split('T')[0];

    return auditLogs.filter((log) => {
      const logDate = new Date(log.actionDate).toISOString().split('T')[0];
      return logDate === formattedSearchDate;
    });
  }
}
