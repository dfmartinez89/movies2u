import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetMoviesResponse, Movie } from '../interfaces';

const url = 'http://localhost:3000/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}
  getMovies() {
    return this.http.get<GetMoviesResponse>(url);
  }
}
