import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let moviesService: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    moviesService = TestBed.inject(MoviesService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  xit('should have getMovies function', () => {
    expect(moviesService.getMovies).toBeTruthy();
  });
});
