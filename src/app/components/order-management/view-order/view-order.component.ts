import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent {

  order_id: any;

  constructor(private service: CommonService, private route: ActivatedRoute, private toastr: NzMessageService) { }

  ngOnInit() {
    this.order_id = this.route.snapshot.queryParamMap.get('order_id');
    // this.getBuseSchedule(this.order_id);
  }


}
