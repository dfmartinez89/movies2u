/* eslint-disable max-len */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetAllMovies, IMDBResponse, Movie, Review, SearchMovies } from '../interfaces';
import { GetMovieDetails } from '../interfaces/index';
import { HandlerService } from './handler.service';
import { UsersService } from './users.service';

const url = environment.apiUrl;
const imdbUrl = environment.apiSearchIMDbUrl;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private handlerService: HandlerService
  ) {}

  getMovies() {
    return this.http.get<GetAllMovies>(url);
  }

  getMovieDetails(id: string) {
    return this.http.get<GetMovieDetails>(`${url}/${id}`);
  }

  searchMovies(key: string, value: string) {
    return this.http.get<SearchMovies>(
      `${environment.apiSearchUrl}?${key}=${value}`
    );
  }

  async searchMoviesIMDb(value: string){
    const token = await this.usersService.getTokenFromStorage();
    if (!token || token === null) {
      this.handlerService.infoAlert('You need to be logged in to search movies at IMDb');
    } else {
      return this.http.get<IMDBResponse>(`${imdbUrl}?criteria=${value}`, {
        headers: new HttpHeaders({}).set('Authorization', `Bearer ${token}`),
      });
    }
  }

  async addMovie(movie: Movie) {
    const token = await this.usersService.getTokenFromStorage();
    if (!token || token === null) {
      this.handlerService.infoAlert('You need to be logged in to add a movie');
    } else {
      return this.http.post<Movie>(url, movie, {
        headers: new HttpHeaders({}).set('Authorization', `Bearer ${token}`),
      });
    }
  }

  async updateMovie(movieId: string, movie: Movie) {
    const token = await this.usersService.getTokenFromStorage();
    if (!token || token === null) {
      this.handlerService.infoAlert(
        'You need to be logged in to update a movie'
      );
    } else {
      return this.http.put<Movie>(`${url}/${movieId}`, movie);
    }
  }

  async deleteMovie(movieId: string) {
    const token = await this.usersService.getTokenFromStorage();
    if (!token || token === null) {
      this.handlerService.infoAlert(
        'You need to be logged in to delete a movie'
      );
    } else {
      return this.http.delete(`${url}/${movieId}`, {
        headers: new HttpHeaders({}).set('Authorization', `Bearer ${token}`),
      });
    }
  }

  addReview(movieId: string, review: Review) {
    return this.http.post<Review>(`${url}/${movieId}/reviews`, review);
  }

  async deleteReview(movieId: string, reviewId: string) {
    const token = await this.usersService.getTokenFromStorage();
    if (!token || token === null) {
      this.handlerService.infoAlert(
        'You need to be logged in to delete a review'
      );
    } else {
      return this.http.delete(`${url}/${movieId}/reviews/${reviewId}`, {
        headers: new HttpHeaders({}).set('Authorization', `Bearer ${token}`),
      });
    }
  }
}
