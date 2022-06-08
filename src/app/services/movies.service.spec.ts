import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let moviesService: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    moviesService = TestBed.inject(MoviesService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(moviesService).toBeTruthy();
  });

  it('should make api call', () => {
    const mockRes = [
      {
        success: 'true',
        count: 3,
        data: [1,2,3],
      },
    ];
    moviesService.getMovies().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toHaveSize(1);
      expect(res[0].success).toBeTruthy();
      expect(res[0].count).toBe(3);
      expect(res[0].data).toEqual([1,2,3]);
    });

    const mockReq = httpTestingController.expectOne(
      'http://localhost:3000/movies'
    );
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(mockRes);
  });
});
