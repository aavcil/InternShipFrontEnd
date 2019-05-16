import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertifyService } from './Alertify.service';
import { apiUrl, studentId } from 'src/app/global';
import { File } from 'src/models/File';
import { Observable } from 'rxjs';
import { GetFile } from 'src/models/GetFile';

@Injectable({
  providedIn: 'root'
})

export class FileService {
path=apiUrl;
studentId=parseInt(studentId);
  constructor(private httpClient: HttpClient,private router:Router,private alertify:AlertifyService) { }

  addPresentation(file) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    var x=new File();
    x.studentId=this.studentId;
    x.file=file;
    this.httpClient.post(this.path + "Files", x,{headers}).subscribe(data => {
      this.alertify.success("Sunum Sisteme Yüklendi.")
    });
  }

  getPresentation():Observable<GetFile>{
    return this.httpClient.get<GetFile>(this.path+"Files?id="+this.studentId);
   }

}
