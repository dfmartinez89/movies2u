/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../interfaces';
import { NavController } from '@ionic/angular';

const url = environment.apiLoginUrl;
const baseurl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  token: string = null;
  localToken = 'movies2u_db/_ionickv/token';

  ready = false;
  private storageReady = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) {
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
          } else {
            this.deleteToken();
            resolve(false);
          }
        },
        (err) => {
          this.deleteToken();
          resolve(false);
        }
      );
    });
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set(this.localToken, this.token).then(
      () => {
        console.log(this.getTokenFromStorage());
      },
      (err) => {
        console.log('no guardado storage');
      }
    );
  }

  async getTokenFromStorage() {
    this.token = (await this.storage.get(this.localToken)) || null;
    return this.token;
  }

  async validateToken() {
    await this.getTokenFromStorage();
    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
    }
  }

  async deleteToken() {
    this.token = null;
    await this.storage.clear();
  }
}
