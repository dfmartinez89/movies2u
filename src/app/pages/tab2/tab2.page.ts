import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
import { Movie, Result, SearchErrorResponse } from '../../interfaces';
import { MoviesService } from '../../services/movies.service';
import { HandlerService } from 'src/app/services/handler.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  search: string;
  movies: Movie[] = [];
  results: Result[] = [];
  loading = false;
  // eslint-disable-next-line @typescript-eslint/ban-types
  error: SearchErrorResponse;

  constructor(
    private moviesService: MoviesService,
    private usersService: UsersService,
    private modalCtrl: ModalController,
    private handlerService: HandlerService
  ) {}

  async onSearchChange(event) {
    const value: string = event.detail.value;
    if (value.length === 0) {
      this.loading = false;
      this.movies = [];
      return;
    }
    this.loading = true;

    //If the user is authenticated, we search for movies at IMDb
    const token = await this.usersService.getTokenFromStorage();
    if (!token || token === null) {
      this.moviesService.searchMovies(this.search, value).subscribe(
        (res) => {
          this.movies = res.data;
          this.loading = false;
          this.error = null;
        },
        (err) => {
          if (err.status === 400 || err.status === 406) {
            this.handlerService.infoAlert(err.error.message);
          } else if (err.status === 400) {
            this.error.message =
              'We could not find any movies matching your search';
            this.movies = [];
            this.loading = false;
          }

          this.loading = false;
        }
      );
    } else {
   (await this.moviesService.searchMoviesIMDb(value)).subscribe((res) => {
        this.results = res.results;
        this.loading = false;
        this.error = null;
      });
    }
  }

  radioGroupChange(event) {
    this.search = event.detail.value;
  }

  async getDetails(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: { id },
    });
    modal.present();
  }
}
