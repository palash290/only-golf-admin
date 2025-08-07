import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-seller',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-seller.component.html',
  styleUrl: './view-seller.component.css'
})
export class ViewSellerComponent {

  seller_id: any;
  carFeaturesList: string[] = [];
  clientsList: any;
  sellerData: any;
  userImg1: any;
  @ViewChild('closeModalAcc') closeModalAcc!: ElementRef;
  @ViewChild('closeModalRej') closeModalRej!: ElementRef;

  constructor(private service: CommonService, private route: ActivatedRoute, private toastr: NzMessageService) { }

  ngOnInit() {
    this.seller_id = this.route.snapshot.queryParamMap.get('seller_id');
    this.getBuseSchedule(this.seller_id);
  }

  getBuseSchedule(seller_id?: any) {
    this.service.get(`admin/get-seller-by-seller-id/${seller_id}`).subscribe({
      next: (resp: any) => {
        this.sellerData = resp.data;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }

  reject() {
    const formURlData = new URLSearchParams()
    formURlData.set('seller_status', 'REJECTED')
    formURlData.set('user_id', this.seller_id)
    this.service
      .post('admin/approve-reject-seller', formURlData.toString())
      .subscribe({
        next: (resp: any) => {
          if (resp.success == true) {
            this.toastr.success(resp.message);
            this.closeModalRej.nativeElement.click();
            this.getBuseSchedule();
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

  accept() {
    const formURlData = new URLSearchParams()
    formURlData.set('seller_status', 'APPROVED')
    formURlData.set('user_id', this.seller_id)
    this.service
      .post('admin/approve-reject-seller', formURlData.toString())
      .subscribe({
        next: (resp: any) => {
          if (resp.success == true) {
            this.toastr.success(resp.message);
            this.closeModalAcc.nativeElement.click();
            this.getBuseSchedule();
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
