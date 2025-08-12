import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';
import { NzMessageService } from 'ng-zorro-antd/message';

Swiper.use([Navigation, Thumbs]);

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {

  post_id: any;
  userData: any;
  allComments: any;
  userImg1: any;
  thumbsSwiper: any;
  isLoading: boolean = false;
  isCommentVisible = false;
  nestedCommentVisible: Set<any> = new Set();
  nestedCommentLoading: number | null = null;
  @ViewChild('closeModalDelete') closeModalDelete!: ElementRef;

  constructor(private service: CommonService, private route: ActivatedRoute, private toastr: NzMessageService,
    private router: Router) { }

  ngOnInit() {
    this.post_id = this.route.snapshot.queryParamMap.get('post_id');
    this.getSinglePost(this.post_id);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.thumbsSwiper = new Swiper('.mySwiperThumbs', {
        spaceBetween: 10,
        slidesPerView: 4,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        loop: false
      });

      new Swiper('.mySwiperMain', {
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {
          swiper: this.thumbsSwiper,
        },
      });
    }, 1000);
  }

  getSinglePost(post_id: any) {
    this.service.get(`post/${post_id}`).subscribe({
      next: (resp: any) => {
        this.userData = resp.data;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }

  getComments(post_id: any) {
    this.service.get(`comment/${post_id}`).subscribe({
      next: (resp: any) => {
        this.allComments = resp.data;
        this.nestedCommentVisible.clear();
      },
      error: error => {
        console.log(error.message);
      }
    });
  }

  getNestedComments(parent_comment_id: number) {
    this.nestedCommentLoading = parent_comment_id;
    this.service.get(`comment/nested/${parent_comment_id}`).subscribe({
      next: (resp: any) => {
        this.nestedCommentVisible.add(parent_comment_id);
        const parent = this.allComments.find((c: { comment_id: number; }) => c.comment_id == parent_comment_id);
        if (parent) {
          parent.replies = resp.data || [];
        }
      },
      error: error => {
        this.nestedCommentVisible.clear();
        console.error(error.message)
      }
    });
  }

  deletePost() {
    this.isLoading = true;
    this.service
      .delete(`admin/delete-post/${this.post_id}`)
      .subscribe({
        next: (resp: any) => {
          if (resp.success == true) {
            this.toastr.success(resp.message);
            this.closeModalDelete.nativeElement.click();
            this.router.navigateByUrl('/home/post-management');
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.toastr.warning(resp.message);
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          this.toastr.warning(error || 'Something went wrong!');
        }
      })
  }

  toggleComment() {
    this.getComments(this.post_id);
    this.isCommentVisible = !this.isCommentVisible;
    this.nestedCommentLoading = null;
  }


}
