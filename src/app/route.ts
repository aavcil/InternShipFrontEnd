import { Routes } from '@angular/router';
import { LoginComponent } from './Login/Login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guard/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { InternShipComponent } from './InternShip/InternShip.component';
import { AddDayComponent } from './addDay/addDay.component';
import { IndexComponent } from './index/index.component';
import { PresentationComponent } from './presentation/presentation.component';
import { PresentationReadyComponent } from './presentationReady/presentationReady.component';
import { LoginAcademicComponent } from './login-academic/login-academic.component';
import { RecourseComponent } from './Recourse/Recourse.component';

export const appRoutes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginAcademic', component: LoginAcademicComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'internShip', component: InternShipComponent },
      { path: 'addDay', component: AddDayComponent },
      { path: 'recourse', component: RecourseComponent },
      { path: 'presentation', component: PresentationComponent },
      { path: 'presentationTime', component: PresentationReadyComponent },
    ]
  },


  

  { path: "**", redirectTo: "home", pathMatch: "full" }




];