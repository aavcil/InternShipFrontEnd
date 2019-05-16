import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-academic',
  templateUrl: './login-academic.component.html',
  styleUrls: ['./login-academic.component.scss']
})
export class LoginAcademicComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }
  loginUser: any = {};
  ngOnInit() {

    if (this.authService.loggedIn()) {
      this.route.navigateByUrl('/home');
    }
  }

  login() {
    this.authService.login(this.loginUser);
  }
  logOut() {
    this.authService.logOut();
  }
  get isAuthenticated() {
    return this.authService.loggedIn();
  }
}
