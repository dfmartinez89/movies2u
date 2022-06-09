import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie, Review } from '../interfaces';
import { MoviesService } from '../services/movies.service';
import { ReviewsPage } from '../reviews/reviews.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @Input() id;
  movie: Movie;
  reviews: Review[];

  swiperOpts = {
    slidesPerView: 1.3,
    freeMode: true,
    spaceBetween: -5,
  };

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getMovieDetails(this.id);
  }

  getMovieDetails(id: string) {
    this.moviesService.getMovieDetails(id).subscribe((resp) => {
      this.movie = resp.data;
      this.reviews = resp.data.reviews;
    });
  }

  async addReview(id: string) {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ReviewsPage,
      componentProps: { id },
    });
    modal.present();
  }

  back() {
    this.modalCtrl.dismiss();
  }
}
