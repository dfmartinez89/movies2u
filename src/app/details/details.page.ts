import { Component, Input, OnInit } from '@angular/core';
import { Movie, Review } from '../interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @Input() id;
  movie: Movie;
  reviews: Review[];
  noImage = 'assets/img/no-image.jpg';

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.getMovieDetails(this.id);
  }

  getMovieDetails(id: string) {
    this.moviesService.getMovieDetails(id).subscribe((resp) => {
      this.movie = resp.data;
      this.reviews = resp.data.reviews;
    });
  }
}
