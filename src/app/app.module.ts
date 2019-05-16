import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { appRoutes } from './route';
import { CommonModule } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/Login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarModule } from 'angular-calendar';
import { AlertifyService } from '../services/Alertify.service';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';
import { InternShipComponent } from './InternShip/InternShip.component';
import { AddDayComponent } from './addDay/addDay.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { IndexComponent } from './index/index.component';
import { ParticlesModule } from 'angular-particle';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BrowserModule } from '@angular/platform-browser';
import { PresentationComponent } from './presentation/presentation.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import localeTrExtra from '@angular/common/locales/extra/tr';
import { PresentationReadyComponent } from './presentationReady/presentationReady.component';
import { LoginAcademicComponent } from './login-academic/login-academic.component';
import { HomeComponent } from './home/home.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RecourseComponent } from './Recourse/Recourse.component';
registerLocaleData(localeTr, 'tr-TR',localeTrExtra);
@NgModule({
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      NoopAnimationsModule,
      FormsModule,
      HttpClientModule,
      AngularEditorModule,
      RouterModule,
      CommonModule,
      Ng2SearchPipeModule,
      ReactiveFormsModule,
      NgbModule,
      RouterModule.forRoot(appRoutes),
      ToastrModule.forRoot(),
      ParticlesModule,
      NgCircleProgressModule.forRoot({
         "backgroundColor": "#CC3400",
         "radius": 60,
         "maxPercent": 200,
         "unitsColor": "#FFFFFF",
         "outerStrokeWidth": 5,
         "outerStrokeColor": "#FFFFFF",
         "innerStrokeColor": "#FFFFFF",
         "titleColor": "#FFFFFF",
         "subtitleColor": "#FFFFFF",
         "showSubtitle": false,
         "showInnerStroke": false,
         "startFromZero": false
      }),
      PdfViewerModule,
   ],
   declarations: [
      AppComponent,
      LoginComponent,
      SidebarComponent,
      HomeComponent,
      NavbarComponent,
      ProfileComponent,
      InternShipComponent,
      AddDayComponent,
      RecourseComponent,
      IndexComponent,
      PresentationComponent,
      PresentationReadyComponent,
      LoginAcademicComponent
   ],
   providers: [
      AlertifyService,
      {provide: LOCALE_ID, useValue: 'tr-TR' }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
