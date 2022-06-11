import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HandlerService } from 'src/app/services/handler.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginUser = {
    email: '',
    password: '',
  };

  constructor(private usersService: UsersService, private navCtrl: NavController, private handlerService: HandlerService) {}

  ngOnInit() {}

  async login(flogin: NgForm) {
    if (flogin.invalid) {
      return;
    }
    const isLogin = this.usersService.login(
      this.loginUser.email,
      this.loginUser.password
    ).then((res) => {

    }, (err) => {
      console.log(err);
    });
    if (isLogin) {
      //browse tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      //show alert
      this.handlerService.infoAlert('Name or password incorrect');
    }
  }
}
