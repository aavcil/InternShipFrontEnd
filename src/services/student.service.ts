import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Students } from 'src/models/Students';
import { apiUrl } from 'src/app/global';
import { Observable } from 'rxjs';
import { isThereInternShip } from 'src/models/isThereInternShip';
import { Days } from 'src/models/Days';
import { InternShipDates } from 'src/models/InternShipDates';
import { Router } from '@angular/router';
import { InternShipAdd } from 'src/models/InternShipAdd';
import { Photos } from 'src/models/Photos';
import { addPhoto } from 'src/models/AddPhoto';
import { getLocaleDayNames } from '@angular/common';
import { JustDay } from 'src/models/JustDay';
import { AssignmentForStudent } from 'src/models/AssignmentForStudent';
import { AlertifyService } from './Alertify.service';
import { Company } from 'src/models/Company';
import { Recourse } from 'src/models/Recourse';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient, private router: Router, private alertify: AlertifyService) { }

  path = apiUrl;
  getDatas: any;
  getStudentById(id): Observable<Students> {
    return this.httpClient.get<Students>(this.path + "Students/getStudentById?id=" + id);
  }

  isThereInternShip(id) {
    return this.httpClient.get(this.path + "InternShip/IsThereInternShip?id=" + id);
  }
  getRecourse(id): Observable<Recourse>  {
    return this.httpClient.get<Recourse>(this.path + "Recourse/GetRecourseById?id=" + id);
  }

  getDayInfo(id): Observable<JustDay> {
    return this.httpClient.get<JustDay>(this.path + "Days/getDayInfo?id=" + id);
  }
  getAssignmentForStudent(id): Observable<AssignmentForStudent> {
    return this.httpClient.get<AssignmentForStudent>(this.path + "InternShip/getAssignment?id=" + id);
  }
  getDaysById(id): Observable<Days[]> {
    return this.httpClient.get<Days[]>(this.path + "Days?id=" + id);
  }
  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.path + "Companies/All");
  }
  getDates(): Observable<InternShipDates[]> {
    return this.httpClient.get<InternShipDates[]>(this.path + "SpecificDays");
  }

  addInternShip(internShip) {
    var x = new InternShipAdd();
    x.finishDate = internShip.finishDate;
    x.startDate = internShip.startDate;
    x.studentId = parseInt(localStorage.getItem("studentId"));
    this.httpClient.post(this.path + "InternShip", x).subscribe(data => {
      this.router.navigate(['/addDay']);
    });
  }

  addDay(Day) {
    this.httpClient.post(this.path + "Days", Day).subscribe(data => {
      if (data) {
        this.alertify.success("İşlem Başarılı");
      } else {
        this.alertify.error("İşlem Başarısız");
      }
    });
  }
  async addPhoto(photo, id) {
    var photos = new addPhoto();
    photos.url = photo.photoUrl;
    photos.dayId = id;
    photos.randomWord = "string";
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    await this.httpClient.post(this.path + "Days/addPhoto", photos, { headers }).subscribe(data => {

    });
  }

  addRecourse(rec) {
    this.httpClient.post(this.path + "Recourse", rec).subscribe(data => {
      this.alertify.success("Başvuru İşlemi Başarılı!");
      location.reload();
    });
  }


  addCompany(company) {
    this.httpClient.post(this.path + "Companies", company).subscribe(data => {
      this.alertify.success("Firma Ekleme İşlemi Başarılı!");
    });
  }
  addExistCompany(company) {
    this.httpClient.post(this.path + "Companies/AddExist", company).subscribe(data => {
      this.alertify.success("Firma Ekleme İşlemi Başarılı!");
      location.reload();

    });
  }

  randomWord() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 18; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
