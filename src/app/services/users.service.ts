/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../interfaces';

const url = environment.apiLoginUrl;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  token: string = null;
  ready = false;
  private storageReady = new BehaviorSubject(false);

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    this.storageReady.next(true);
    this.ready = true;
  }

  login(email: string, password: string) {
    const data = { email, password };

    return new Promise((resolve) => {
      this.http.post<LoginResponse>(url, data).subscribe(
        (resp) => {
          if (resp.success) {
            this.saveToken(resp.token);
            resolve(true);
          }
        },
        (err) => {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      );
    });
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', this.token).then(
      () => {
        console.log(this.getTokenFromStorage());
      },
      (err) => {
        console.log('no guardado storage');
      }
    );
  }

  async getTokenFromStorage() {
    const savedToken: string = (await this.storage.get('token')) || [];
    return savedToken;
  }
}
