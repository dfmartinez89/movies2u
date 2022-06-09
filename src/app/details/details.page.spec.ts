import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsPage } from './details.page';
import { HttpClient } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesService } from '../services/movies.service';

xdescribe('DetailsPage', () => {
  let component: DetailsPage;
  let fixture: ComponentFixture<DetailsPage>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let moviesService: MoviesService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    moviesService = TestBed.inject(MoviesService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call moviesService', () => {
    const moviesServiceSpy = spyOn(
      moviesService,
      'getMovieDetails'
    ).and.callThrough();

    component.ngOnInit();
    expect(moviesServiceSpy).toHaveBeenCalledTimes(1);
  });
});
