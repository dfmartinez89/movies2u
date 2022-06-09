import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetAllMovies, Movie, Review, SearchMovies } from '../interfaces';
import { GetMovieDetails } from '../interfaces/index';

const url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<GetAllMovies>(url);
  }

  getMovieDetails(id: string) {
    return this.http.get<GetMovieDetails>(`${url}/${id}`);
  }

  searchMovies(key: string, value: string) {
    return this.http.get<SearchMovies>(`${environment.apiSearchUrl}?${key}=${value}`);
  }

  addReview(movieId: string, review: Review) {
    return this.http.post<Review>(`${url}/${movieId}/reviews`, review);
  }
}
