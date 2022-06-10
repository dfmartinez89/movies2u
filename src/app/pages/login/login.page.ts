import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginUser = {
    email: 'user1@test.com',
    password: '123456',
  };

  constructor(private usersService: UsersService, private navCtrl: NavController) {}

  ngOnInit() {}

  async login(flogin: NgForm) {
    if (flogin.invalid) {
      return;
    }
    const isLogin = await this.usersService.login(
      this.loginUser.email,
      this.loginUser.password
    );
    if (isLogin) {
      //browse tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      //mostrar error
    }
  }
}
