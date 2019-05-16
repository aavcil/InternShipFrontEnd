import { Component, OnInit, Injectable } from '@angular/core';
import { FileService } from 'src/services/file.service';
import { HttpRequest, HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { apiUrl, studentId, fileUrl } from '../global';
const formData = new FormData();

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})

export class PresentationComponent implements OnInit {
  file: any;
  constructor(private fileService: FileService, private http: HttpClient) { }
  public prog: number;
  public message: string;
  
  ngOnInit() {

  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    this.file = files[0];
  }

  add() {
    const uploadReq = new HttpRequest('POST', apiUrl + `Files`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.prog = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }
  upload(files) {
    this.prog=0;
    if (files.length === 0)
      return;
    for (let file of files)
      formData.append(file.name, file);
    // let headers:HttpHeaders=new HttpHeaders();
    // headers.append("Accept","application/json");
    // headers.append("Authorization","Bearer "+localStorage.getItem("token"));
    formData.append("studentId",studentId);
  }
}
