import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

const url = environment.apiLoginUrl;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  token: string = null;

  constructor(private http: HttpClient, private storage: Storage) {}

  login(email: string, password: string) {
    const data = {email, password};
    this.http.post(url, data).subscribe(resp=>{
      console.log(resp);
      // this.token = resp['token'];
      // this.storage.set('token', this.token);
    });
  }
}
