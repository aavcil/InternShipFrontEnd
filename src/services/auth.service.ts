import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { apiUrl } from '../app/global';
import { LoginUser } from '../models/LoginUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { GetId } from 'src/models/GetId';
import { AlertifyService } from './Alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService:AlertifyService
  ) { }
  path = apiUrl;
  userToken: any = null;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = "token"
  userId: any;
  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient.post(this.path + "Auth/login", loginUser, { headers: headers })
      .subscribe(data => {
        this.router.navigateByUrl("/home");
        this.alertifyService.error("Sistemden çıkış yapıldı.");
        this.saveToken(data["tokenString"]);
       this.saveStudentId(data["student"].id);
        this.userToken = data["tokenString"];
      });
  }
  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  saveStudentId(id) {
    localStorage.setItem("studentId", id);
  }
  loggedIn() { 
    return !this.jwtHelper.isTokenExpired(this.token);
  }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem("studentId");
    localStorage.removeItem("isThereInternShip");
   this.alertifyService.error("Sistemden çıkış yapıldı.");
    this.router.navigateByUrl("/login");
    return true;
  }
  //5935
  // getStudentId():Observable<GetId> {
  //  return this.httpClient.get<GetId>(this.path + "Auth/getId?id=" + this.getCurrentUserId());

  // }
  // getCurrentUserId() {
  //   return (this.jwtHelper.decodeToken(this.token).nameid);
  // }
}

