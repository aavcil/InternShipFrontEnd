import { Component, OnInit } from '@angular/core';
import { Students } from 'src/models/Students';
import { StudentService } from 'src/services/student.service';
import { AuthService } from 'src/services/auth.service';
import { studentId } from '../global';
import { fileUrl } from '../global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private studentService: StudentService, private authService: AuthService) { }
  student: Students=new Students();
  imageUrl:string=null;
  
  ngOnInit() {  
     this.studentService.getStudentById(studentId).subscribe(x=>{
      this.student=x;
      console.log(this.student);
     });
     this.imageUrl=fileUrl;
  }

}
