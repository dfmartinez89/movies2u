import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesService } from '../services/movies.service';

import { Tab2Page } from './tab2.page';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let moviesService: MoviesService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab2Page],
      imports: [
        IonicModule.forRoot(),
        ExploreContainerComponentModule,
        HttpClientTestingModule,
      ],
      providers: [MoviesService],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    moviesService = TestBed.inject(MoviesService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  xit('should call moviesService', () => {
    const moviesServiceSpy = spyOn(
      moviesService,
      'getMovieDetails'
    ).and.callThrough();
    const id = '123';
    component.getDetails(id);
    expect(moviesServiceSpy).toHaveBeenCalledTimes(1);
  });
});
