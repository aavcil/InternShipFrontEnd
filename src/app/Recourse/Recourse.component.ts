import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/services/student.service';
import { Recourse } from 'src/models/Recourse';
import { studentId, fileUrl } from '../global';
import { RecourseRequest } from 'src/models/RecourseRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Recourse',
  templateUrl: './Recourse.component.html',
  styleUrls: ['./Recourse.component.scss']
})
export class RecourseComponent implements OnInit {

  constructor(private student: StudentService, private route: Router) { }

  recourse: Recourse = null;
  imageUrl: string = fileUrl;
  isNull: boolean = false;
  base64textString: string;
  ngOnInit() {
    this.getRecourse();
  }
  async getRecourse() {
    await this.student.getRecourse(studentId).subscribe(async x => {
      if (x)
        this.recourse = await x;
      else {
        this.isNull = true;
      }
    });
  }
  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }
  addRecourse() {
    var req = new RecourseRequest();
    req.studentId = parseInt(studentId);
    req.url = this.base64textString;
    this.student.addRecourse(req);
  }
}
