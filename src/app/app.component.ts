import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { StudentService } from 'src/services/student.service';
import { studentId, fileUrl } from './global';
import { Recourse } from 'src/models/Recourse';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isApproved: boolean = true;
  recourse: Recourse = new Recourse();
  imageUrl: string = fileUrl;

  constructor(private route: Router, private studentService: StudentService) {
    this.routeEvent(this.route);
    if (studentId != null) {
      this.studentService.getRecourse(studentId).subscribe(x => {
        if (x!=null) {
          if (x.isApproved == 0 || x.isApproved == 2)
            this.isApproved = false;
          this.recourse = x;
        }
        else {
          this.route.navigateByUrl("/recourse");
        }
      });
    }
  }
  url: string;
  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.url = e.url;
      }
    });
  }


}
