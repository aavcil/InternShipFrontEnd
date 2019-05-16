import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/services/student.service';
import { InternShipDates } from 'src/models/InternShipDates';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Company } from 'src/models/Company';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { studentId } from '../global';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ExistCompany } from 'src/models/ExistCompany';
@Component({
  selector: 'app-InternShip',
  templateUrl: './InternShip.component.html',
  styleUrls: ['./InternShip.component.scss']
})

export class InternShipComponent implements OnInit {
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

  constructor(private studentService: StudentService, private formBuilder: FormBuilder, private _modalService: NgbModal) { }
  dates: InternShipDates[];
  company: Company;
  date: any;
  isFull: boolean = true;
  inputHimSelf: boolean = false;
  num:number=1;
  items: Company[];
  companyAddForm: FormGroup;
  base64textString: string;
  selectedCompany: Company = null;
  ngOnInit() {
    this.createCompanyForm();
    this.studentService.getDates().subscribe(x => {
      this.dates = x;
    });
    this.getCompanies();
    this.studentService.getStudentById(studentId).subscribe(x => {
      if (x["companies"])
        this.isFull = false;
      console.log(this.isFull)
    })
  }
  async getCompanies() {
    await this.studentService.getCompanies().subscribe(x => {
      this.items = x;
    });
  }
  createCompanyForm() {
    this.companyAddForm = this.formBuilder.group(
      {
        personelCount: ["", Validators.required],
        description: ["", Validators.required],
        mail: ["", Validators.required],
        telephone: ["", Validators.required],
        address: ["", Validators.required],
        name: ["", Validators.required],
      });
  }
  onItemChange(item) {
    console.log(item);
    this.date = item;
  }
  async addCompany() {
    if (this.companyAddForm.valid) {
      this.company = Object.assign({}, this.companyAddForm.value);
      this.company.logoUrl = this.base64textString;
      this.company.userId = parseInt(localStorage.getItem("studentId"));
      await this.studentService.addCompany(this.company);
      await this.studentService.addInternShip(this.date);
    }
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
  open(content, item) {
    this._modalService.open(content);
    this.selectedCompany = item;
    console.log(this.selectedCompany);
  }
  
  input(){
    this.num++;
    if(this.num%2==0){ 
       this.inputHimSelf=true;
    }else{
      this.inputHimSelf=false;
    }  
  }
  async addCompanyWithSelect() {
    var comp = new ExistCompany();
    comp.id = this.selectedCompany.id;
    comp.userId = parseInt(localStorage.getItem("studentId"));
    await this.studentService.addExistCompany(comp);
    await this.studentService.addInternShip(this.date);
  }
}
