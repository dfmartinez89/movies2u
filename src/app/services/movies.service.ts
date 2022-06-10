/* eslint-disable max-len */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetAllMovies, Movie, Review, SearchMovies } from '../interfaces';
import { GetMovieDetails } from '../interfaces/index';
import { UsersService } from './users.service';

const url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient, private usersService: UsersService) {}

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

  addMovie(movie: Movie) {
    const token = this.usersService.getTokenFromStorage();
    return this.http.post<Movie>(url, movie, {
      headers: new HttpHeaders({}).set('Authorization', `Bearer ${token}`),
    });
  }

  addReview(movieId: string, review: Review) {
    return this.http.post<Review>(`${url}/${movieId}/reviews`, review);
  }

 deleteReview(movieId: string, reviewId: string) {
      this.usersService.getTokenFromStorage().then((resp) => {
      console.log(resp);
    });
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTI5YmZhZGMyZGQ0YzEzNWYxNDhjZiIsImlhdCI6MTY1NDg3MjI5OSwiZXhwIjoxNjU3NDY0Mjk5fQ.YXGNzPKV2a9xTu8dcfIXFYniUsl58iLEJYbFLZC9OwU';
   return  this.http.delete(`${url}/${movieId}/reviews/${reviewId}`, {
    headers: new HttpHeaders({}).set('Authorization', `Bearer ${token}`),
  });
  }
}
