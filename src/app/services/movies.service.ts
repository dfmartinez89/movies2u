import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetAllMovies, Movie } from '../interfaces';
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
}
