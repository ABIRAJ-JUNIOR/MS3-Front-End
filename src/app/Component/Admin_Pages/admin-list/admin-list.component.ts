import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../../Service/Admin/admin.service';
import { Admin } from '../../../Modals/modals';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent {
  admins: Admin[] = [];
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;
  currentLength:number = 0;
  totalItems:number = 0;


  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.adminService.pagination(this.currentPage , this.pageSize).subscribe({
      next:((response:any) => {
        this.totalPages = response.totalPages
        this.totalItems = response.totalItem
        response.items.forEach((a:Admin) => {
          a.imagePath = "https://localhost:7044/" + a.imagePath
        })
        this.admins = response.items
      }),
      complete:() => {
        this.currentLength = this.admins.length
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadItems();
    }
  }
}
