import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

  data: any;
  businessLogoUrl: string = '';
  p: any = 1;

  constructor(private commonService: CommonService, private toastr: NzMessageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // const savedPage = localStorage.getItem('userPage');
    // this.p = savedPage ? Number(savedPage) : 1;
    this.getDetails();
  }

  // onPageChange(page: number) {
  //   this.p = page;
  //   localStorage.setItem('userPage', String(page));
  // }


  getDetails() {
    this.commonService.get('admin/get-all-users').subscribe({
      next: (resp: any) => {
        this.data = resp.data;
        this.filterTable();
      },
      error: (error) => {
        console.log(error || 'Something went wrong!');
      }
    });
  }

  handleCheckboxChange(row: any) {
    if (row.is_user_banned == 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to unblock this user!",
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
          this.commonService.post(`admin/block-unblock-user`, formURlData.toString()).subscribe({
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
        text: "You want to block this user!",
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
          this.commonService.post(`admin/block-unblock-user`, formURlData.toString()).subscribe({
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

  searchText: string = '';
  filteredData: any[] = [];

  filterTable() {
    this.p = 1;
    let filtered = this.data;
    // Filter by customer name
    if (this.searchText.trim()) {
      const keyword = this.searchText.trim().toLowerCase();
      filtered = filtered.filter((item: any) =>
      (item.full_name?.toLowerCase().includes(keyword) ||
        item.eamil?.toLowerCase().includes(keyword))
      );
    }
    this.filteredData = filtered;
  }


}
