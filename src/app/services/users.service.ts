/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

const url = environment.apiLoginUrl;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  token: string = null;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  init() {
    this.storage.create();
  }

  login(email: string, password: string) {
    const data = { email, password };
    this.http.post(url, data).subscribe((resp) => {
      console.log(resp);
      if (resp['token']) {
        this.saveToken(resp['token']);
      } else {
        this.token = null;
        this.storage.clear();
      }
    });
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', this.token);
    console.log(this.storage.get('token'));
  }

  async getTokenFromStorage() {
    const savedToken: string = await this.storage.get('token') || [];
    return savedToken;
  }
}
