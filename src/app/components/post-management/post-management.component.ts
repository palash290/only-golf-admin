import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-post-management',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './post-management.component.html',
  styleUrl: './post-management.component.css'
})
export class PostManagementComponent {

  data: any;
  businessLogoUrl: string = '';
  postId: any;
  @ViewChild('closeModalDelete') closeModalDelete!: ElementRef;
  p: any = 1;

  constructor(private commonService: CommonService, private toastr: NzMessageService) {
    this.getDetails();
  }

  getDetails() {
    this.commonService.get('admin/get-all-posts').subscribe({
      next: (resp: any) => {
        this.data = resp.data;
        this.filterTable();
      },
      error: (error) => {
        //this.toastr.warning(error.error?.message || 'Something went wrong!');
      }
    });
  }

  searchText: string = '';
  filteredData: any[] = [];

  filterTable() {
    let filtered = this.data;
    // Filter by customer name
    if (this.searchText.trim()) {
      const keyword = this.searchText.trim().toLowerCase();
      filtered = filtered.filter((item: any) =>
      (item.full_name?.toLowerCase().includes(keyword) ||
        item.business_name?.toLowerCase().includes(keyword))
      );
    }
    this.filteredData = filtered;
  }

  getPostId(id: any) {
    this.postId = id;
  }

  deletePost() {
    this.commonService
      .delete(`admin/delete-post/${this.postId}`)
      .subscribe({
        next: (resp: any) => {
          if (resp.success == true) {
            this.toastr.success(resp.message);
            this.closeModalDelete.nativeElement.click();
            this.getDetails();
          } else {
            this.toastr.warning(resp.message);
          }
        },
        error: (error: any) => {
          if (error.error.message) {
            this.toastr.error(error.error.message);
          } else {
            this.toastr.error('Something went wrong!');
          }
        }
      })
  }


}
