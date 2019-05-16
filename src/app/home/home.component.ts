import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/services/student.service';
import { AssignmentForStudent } from 'src/models/AssignmentForStudent';
import { studentId } from '../global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  Days: any = [];
  count: number = 0;
  assignment: AssignmentForStudent = null;
  time: number = 0;
  timer: number = 0;
  ngOnInit() {
    this.count = 0;
    if (localStorage.getItem("isThereInternShip") == "true") {
      this.studentService.getDaysById(studentId).subscribe(x => {
        this.Days = x;
        for (let i = 0; i < this.Days.length; i++) {
          if (this.Days[i].title != null) {
            this.count++;
          }
        }
        this.count *= 5;
      });
    }
    this.getAssignment();


    setInterval(() => {
      this.timer++;

    }, 60000);
  }

  getAssignment() {
    this.studentService.getAssignmentForStudent(studentId).subscribe(x => {
      if (x) {
        this.assignment = x;
        this.timer = 0;
      }
    });
  }
}
