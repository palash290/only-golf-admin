import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonService } from '../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-seller-payout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './seller-payout.component.html',
  styleUrl: './seller-payout.component.css'
})
export class SellerPayoutComponent {

  selectedStatus: string = 'ALL';
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

    if (this.selectedStatus != 'ALL') {
      filtered = filtered.filter(item => item.seller_status == this.selectedStatus);
    }

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
