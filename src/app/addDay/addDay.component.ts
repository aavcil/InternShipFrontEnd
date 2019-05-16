import { Component, OnInit } from '@angular/core';
import { Days } from 'src/models/Days';
import { StudentService } from 'src/services/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Photos } from 'src/models/Photos';
import { Router } from '@angular/router';
import { JustDay } from 'src/models/JustDay';
import { studentId, fileUrl } from '../global';
import { AlertifyService } from 'src/services/Alertify.service';

@Component({
  selector: 'app-addDay',
  templateUrl: './addDay.component.html',
  styleUrls: ['./addDay.component.scss']
})

export class AddDayComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'v1/images', // if needed
    customClasses: [ // optional
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  day: any = {};
  dayInfo: JustDay=null;
  dayPhoto: Photos=null;
  numbers: number[];
  id: number;
  empList: Array<Photos> = [];

  constructor(private studentService: StudentService, 
    private router: Router, 
    private formBuilder: FormBuilder,
     private modalService: NgbModal,
     private alertifyService:AlertifyService) {
    this.getDays();
  }
  internShip: string;
  iS: boolean = false;
  Days: Days[];
  weekCount: number;
  imageUrl:string;
  base64textString: string;

  ngOnInit() {
    this.internShip = localStorage.getItem("isThereInternShip");
    if (this.internShip == "true") {
      this.iS = true;
    }
    this.getDays();
    this.imageUrl=fileUrl;
  }
  onItemDeleted(index: number) {
    this.empList.splice(index, 1);
  }

  async getDays() {
    this.Days = null;
    await this.studentService.getDaysById(studentId).subscribe(x => {
      this.Days = x;
      this.weekCount = Object.keys(x).length / 5;
      console.log(this.Days);
    });
  }

  
  async addDay() {
    this.day.id = this.id;
    await this.studentService.addDay(this.day);
    for (let i = 0; i < this.empList.length; i++) {
      await this.studentService.addPhoto(this.empList[i], this.id)
    }
    this.modalService.dismissAll();
  }


  openLg(content, id) {
    this.id = id;
    this.studentService.getDayInfo(id).subscribe(x => {
      this.dayInfo = x;
      this.dayPhoto = x["photo"];
    });
    this.modalService.open(content, { size: 'lg' });
  }


  handleFileSelect(evt) {
    this.empList = [];
    var files = evt.target.files;
    for (let i = 0; i < files.length; i++) {
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    var x = new Photos();
    x.photoUrl = this.base64textString;
    this.empList.push(x);
  }
}
