import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonService } from '../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent {

  data: any[] = [];
  filteredData: any[] = [];
  searchText: string = '';
  p: any = 1;

  constructor(private commonService: CommonService, private toastr: NzMessageService) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.commonService.get('admin/get-all-sellers').subscribe({
      next: (resp: any) => {
        this.data = resp.data;
        this.filterTable();
      },
      error: (error) => {
        console.log(error || 'Something went wrong!');
      }
    });
  }

  filterTable() {
    this.p = 1;
    let filtered = this.data;

    if (this.searchText.trim()) {
      const keyword = this.searchText.trim().toLowerCase();
      filtered = filtered.filter(item =>
      (item.full_name?.toLowerCase().includes(keyword) ||
        item.business_name?.toLowerCase().includes(keyword))
      );
    }

    this.filteredData = filtered;
  }


}
