import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

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
  userImg1: any;
  thumbsSwiper: any;

  constructor(private service: CommonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.post_id = this.route.snapshot.queryParamMap.get('post_id');
    this.getBuseSchedule(this.post_id);
  }

  images = [
    "http://192.168.29.44:4000/1754468424973-51e18227-trg-2PCcZ7Xbq4U-unsplash.jpg",
    "http://192.168.29.44:4000/1754468424980-529b986f-viktor-talashuk-bhoj9tHlsiY-unsplash.jpg", "http://192.168.29.44:4000/1754468424973-51e18227-trg-2PCcZ7Xbq4U-unsplash.jpg",
    "http://192.168.29.44:4000/1754468424980-529b986f-viktor-talashuk-bhoj9tHlsiY-unsplash.jpg", "http://192.168.29.44:4000/1754468424973-51e18227-trg-2PCcZ7Xbq4U-unsplash.jpg",
    "http://192.168.29.44:4000/1754468424980-529b986f-viktor-talashuk-bhoj9tHlsiY-unsplash.jpg", "http://192.168.29.44:4000/1754468424973-51e18227-trg-2PCcZ7Xbq4U-unsplash.jpg",
    "http://192.168.29.44:4000/1754468424980-529b986f-viktor-talashuk-bhoj9tHlsiY-unsplash.jpg", "http://192.168.29.44:4000/1754468424973-51e18227-trg-2PCcZ7Xbq4U-unsplash.jpg",
    "http://192.168.29.44:4000/1754468424980-529b986f-viktor-talashuk-bhoj9tHlsiY-unsplash.jpg", "http://192.168.29.44:4000/1754468424973-51e18227-trg-2PCcZ7Xbq4U-unsplash.jpg",
    "http://192.168.29.44:4000/1754468424980-529b986f-viktor-talashuk-bhoj9tHlsiY-unsplash.jpg", "http://192.168.29.44:4000/1754468424973-51e18227-trg-2PCcZ7Xbq4U-unsplash.jpg",
    "http://192.168.29.44:4000/1754468424980-529b986f-viktor-talashuk-bhoj9tHlsiY-unsplash.jpg", "http://192.168.29.44:4000/1754468424973-51e18227-trg-2PCcZ7Xbq4U-unsplash.jpg",
    "http://192.168.29.44:4000/1754468424980-529b986f-viktor-talashuk-bhoj9tHlsiY-unsplash.jpg", "http://192.168.29.44:4000/1754468424973-51e18227-trg-2PCcZ7Xbq4U-unsplash.jpg",
    "http://192.168.29.44:4000/1754468424980-529b986f-viktor-talashuk-bhoj9tHlsiY-unsplash.jpg", "http://192.168.29.44:4000/1754468424973-51e18227-trg-2PCcZ7Xbq4U-unsplash.jpg",
    "http://192.168.29.44:4000/1754468424980-529b986f-viktor-talashuk-bhoj9tHlsiY-unsplash.jpg"
  ]


  ngAfterViewInit() {
    // Wait for DOM and Swiper setup
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
    }, 2000); // or use ngZone.runOutsideAngular if needed
  }

  getBuseSchedule(post_id: any) {
    this.service.get(`post/${post_id}`).subscribe({
      next: (resp: any) => {
        this.userData = resp.data;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }




}
