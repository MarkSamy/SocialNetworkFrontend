import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BlockedComponent } from './components/blocked/blocked.component';
import { BlockedService } from './services/blocked.service';
import { AdsComponent } from './components/ads/ads.component';
import {MatRadioModule} from '@angular/material/radio';
import { BlockedUsersComponent } from './components/blocked-users/blocked-users.component';
import { ActivationFormComponent } from './components/activation-form/activation-form.component';
import { OneSignalService } from './services/push-notification.service';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { HomeComponent } from './components/home/home.component';
import { ContextService } from './services/context.service';
import { PostService } from './services/post.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostDialogComponent } from './components/post-dialog/post-dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import { CommentService } from './services/comment.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { UsersComponent } from './components/users/users.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    BlockedComponent,
    AdsComponent,
    BlockedUsersComponent,
    ActivationFormComponent,
    HomeComponent,
    PostDialogComponent,
    ProfileComponent,
    DashboardComponent,
    HeaderComponent,
    UsersComponent,
    ProfileEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    InfiniteScrollModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTabsModule,
    ToastrModule.forRoot() 

  ],  
  providers: [
    UserService,
    BlockedService,
    OneSignalService,
    ContextService,
    PostService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
