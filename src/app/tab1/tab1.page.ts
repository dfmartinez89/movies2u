import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  movies: Movie[] = [];
  swiperOpts = {
    slidesPerView: 1.2,
    freeMode: true,
    spaceBetween: -10,
  };

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.moviesService.getMovies().subscribe((resp) => {
      if (resp.success) {
        this.movies = resp.data;
      }
    });
  }
  async getDetails(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: { id },
    });
    modal.present();
  }
}
