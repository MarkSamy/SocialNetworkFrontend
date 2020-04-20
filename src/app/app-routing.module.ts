import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BlockedService } from './services/blocked.service';
import { BlockedComponent } from './components/blocked/blocked.component';
import { AdsComponent } from './components/ads/ads.component';
import { BlockedUsersComponent } from './components/blocked-users/blocked-users.component';
import { ActivationFormComponent } from './components/activation-form/activation-form.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'badwords', component: BlockedComponent },
  { path: 'ads', component: AdsComponent },
  { path: 'blockedUsers', component: BlockedUsersComponent },
  { path: 'activate', component:  ActivationFormComponent},
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'editprofile', component: ProfileEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

