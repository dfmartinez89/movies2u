import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetMoviesResponse } from '../interfaces';

const url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}
  getMovies() {
    return this.http.get<GetMoviesResponse>(url);
  }
}
