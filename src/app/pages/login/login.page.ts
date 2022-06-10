import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private usersService: UsersService) {}

  ngOnInit() {}

  login(flogin: NgForm) {
    if (flogin.invalid) {
      return;
    }
    this.usersService.login(this.loginUser.email, this.loginUser.password);
  }
}
