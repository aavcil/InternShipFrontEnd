import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { apiUrl } from '../app/global';
import { LoginUser } from '../models/LoginUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { GetId } from 'src/models/GetId';
@Injectable({
  providedIn: 'root'
})
export class TeacherAuthService {


  constructor(
    private httpClient: HttpClient,
    private router: Router
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
    this.httpClient.post(this.path + "TeachersAuth/login", loginUser, { headers: headers })
      .subscribe(data => {
        this.router.navigateByUrl("/home");
        this.saveToken(data["tokenString"]);
        this.saveTeacherId(data["teacher"].id);
        this.userToken = data["tokenString"];
      });
  }
  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  saveTeacherId(id) {
    localStorage.setItem("teacherId", id);
  }
  loggedIn() {
    return !this.jwtHelper.isTokenExpired(this.token);
  }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem("teacherId");


    // this.alertifyService.error("Sistemden çıkış yapıldı.");
    this.router.navigateByUrl("/loginAcademic");
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
