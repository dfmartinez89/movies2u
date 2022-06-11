import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Movie, Review } from '../../interfaces';
import { MoviesService } from '../../services/movies.service';
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
  review: Review;

  swiperOpts = {
    slidesPerView: 1.3,
    freeMode: true,
    spaceBetween: -5,
  };

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) { }

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

  async onOpenMenu(id) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteReview(id);
          },
        },
      ],
    });

    await actionSheet.present();
  }

  deleteReview(reviewid: string) {
    this.moviesService.deleteReview(this.id, reviewid).subscribe(() => {
      console.log('deleted', reviewid);
      this.modalCtrl.dismiss();
    });
  }

  deleteMovie(id) {
    this.moviesService.deleteMovie(id).subscribe(() => {
      console.log('deleted', id);
      this.modalCtrl.dismiss();
    });
  }

  async onOpenDeleteMenu(id) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: [
        {
          text: 'Delete the movie',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteMovie(id);
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
