import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-seller-management',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './seller-management.component.html',
  styleUrl: './seller-management.component.css'
})
export class SellerManagementComponent {

  selectedStatus: string = 'ALL';
  data: any[] = [];
  filteredData: any[] = [];
  businessLogoUrl: string = '';
  searchText: string = '';
  p: any = 1;

  constructor(private commonService: CommonService, private toastr: NzMessageService) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.commonService.get('admin/get-all-sellers?limit=10&offset=0').subscribe({
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
    let filtered = this.data;

    // Filter by status
    if (this.selectedStatus != 'ALL') {
      filtered = filtered.filter(item => item.seller_status == this.selectedStatus);
    }

    // Filter by customer name
    if (this.searchText.trim()) {
      const keyword = this.searchText.trim().toLowerCase();
      filtered = filtered.filter(item =>
      (item.user_name?.toLowerCase().includes(keyword) ||
        item.business_name?.toLowerCase().includes(keyword))
      );
    }

    this.filteredData = filtered;
  }


  handleCheckboxChange(row: any) {
    if (row.is_banned == 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to unblock this seller!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          const formURlData = new URLSearchParams();
          formURlData.set('user_id', row.user_id);
          this.commonService.post(`admin/ban-unban-seller`, formURlData.toString()).subscribe({
            next: (resp: any) => {
              this.toastr.success(resp.message);
              this.getDetails();
            }
          })
        } else {
          this.getDetails();
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to block this seller!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          const formURlData = new URLSearchParams();
          formURlData.set('user_id', row.user_id);
          this.commonService.post(`admin/ban-unban-seller`, formURlData.toString()).subscribe({
            next: (resp: any) => {
              this.toastr.success(resp.message);
              this.getDetails();
            }
          })
        } else {
          this.getDetails();
        }
      });
    }
  }


}