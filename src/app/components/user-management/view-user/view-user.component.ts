import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {

  user_id: any;
  carFeaturesList: string[] = [];
  clientsList: any;
  userData: any;
  userImg1: any;

  constructor(private service: CommonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user_id = this.route.snapshot.queryParamMap.get('user_id');
    this.getBuseSchedule(this.user_id);
  }

  getBuseSchedule(agentId: any) {
    this.service.get(`user/${agentId}`).subscribe({
      next: (resp: any) => {
        this.userData = resp.data;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }

  showImg(url: any) {
    this.userImg1 = url;
  }


}
