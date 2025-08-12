import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  data: any;

  constructor(private commonService: CommonService, private toastr: NzMessageService) {
    this.getDetails();
  }

  getDetails() {
    this.commonService.get('admin/get-all-posts').subscribe({
      next: (resp: any) => {
        this.data = resp.data.slice(0, 3);
      },
      error: (error) => {
        console.log(error || 'Something went wrong!');
      }
    });
  }


}
