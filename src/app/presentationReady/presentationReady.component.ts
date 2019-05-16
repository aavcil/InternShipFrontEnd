import { Component, OnInit, Injectable } from '@angular/core';
import { fileUrl } from '../global';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { FileService } from 'src/services/file.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'  // <- ADD THIS
})
@Component({
  selector: 'app-presentationReady',
  templateUrl: './presentationReady.component.html',
  styleUrls: ['./presentationReady.component.scss']
})
export class PresentationReadyComponent implements OnInit {
  pdfSrc: string = fileUrl + 'Upload/ad61c494-00ac-4b1a-b14b-63d25323f698.pdf';
  page: number = 1;
  rotateDegree: number = 0;
  pageCount: number;
  constructor(private fileService: FileService, private router: Router) { }
  ngOnInit() {
    this.fileService.getPresentation().subscribe(x => {
      if (x == null)
        this.router.navigateByUrl("/home");
    });
  }
  ileri() {
    this.page++;
  }
  geri() {
    this.page--;
  }
  callBackFn(pdf?: PDFDocumentProxy) {
    this.pageCount = pdf.numPages;

  }
  rotateRight() {
    this.rotateDegree += 90;
  }
  rotateLeft() {
    this.rotateDegree -= 90;
  }
}
