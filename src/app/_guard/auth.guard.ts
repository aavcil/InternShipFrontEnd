import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { StudentService } from 'src/services/student.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  private internShip: boolean;
  constructor(private route: Router, private logservice: AuthService, private studentService: StudentService) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (this.logservice.loggedIn()) {
      this.getInternShip();
      return true;
    }
    this.route.navigate(['/login']);
    return false;

  }
  getInternShip() {
    this.studentService.isThereInternShip(localStorage.getItem("studentId")).subscribe(a => {
      localStorage.setItem("isThereInternShip", a.toString());
    });
  }
}
