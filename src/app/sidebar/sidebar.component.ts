import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { PresentationReadyComponent } from '../presentationReady/presentationReady.component';
import { prepareProfile } from 'selenium-webdriver/firefox';
import { FileService } from 'src/services/file.service';
import { StudentService } from 'src/services/student.service';
import { studentId } from '../global';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/home', title: 'Home', icon: 'design_app', class: 'menuItems' },
  { path: '/profile', title: 'Profil', icon: 'users_single-02', class: 'menuItems' },
  { path: '/addDay', title: 'Yeni Gün Ekle', icon: 'ui-1_simple-add', class: 'menuItems' },
  { path: '/presentation', title: 'Sunum Dosyası', icon: 'ui-1_simple-add', class: 'menuItems' },

];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService, private fileService: FileService,private studentService:StudentService) { }

  ngOnInit() {
    this.fileService.getPresentation().subscribe(x => {
      if (x!= null)
        ROUTES.push({ path: '/presentationTime', title: 'Sunuma Başla', icon: 'ui-1_simple-add', class: '' });
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    });
  }
  logOut() {
    this.authService.logOut();
  }
  get isAuthenticated() {
    return this.authService.loggedIn();
  }



  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };
}
