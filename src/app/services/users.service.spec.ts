import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';


import { UsersService } from './users.service';

xdescribe('UsersService', () => {
  let service: UsersService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService, Storage],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UsersService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should make api call', () => {
    const mockRes = [
      {
        email: 'hola@user.com',
        token: 'zI1NiIsInR5cCI6IkpXVCJ9',
        _id: [1,2,3],
      },
    ];
    service.login('hola@user.com', '123');

    const mockReq = httpTestingController.expectOne(
      'http://localhost:3000/users/login'
    );
    expect(mockReq.request.method).toEqual('POST');
    mockReq.flush(mockRes);
  });
});
