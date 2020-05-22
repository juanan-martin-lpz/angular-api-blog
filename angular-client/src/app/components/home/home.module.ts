import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HOME_ROUTING} from './home.routing';

import { HomeComponent } from './home.component';
import { PostComponent } from './post/post.component';
import { UsersComponent } from './users/users.component';
import { BlogComponent } from './blog/blog.component';
import { FormComponent } from './post/form/form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterComponent } from '../register/register.component';
import { PostsService } from '../../services/postsservice';
import { PostEntryComponent } from './post-entry/post-entry.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';
import { ViewPostComponent } from './view-post/view-post.component';
import { ProfileComponent } from './profile/profile.component';





@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    UsersComponent,
    BlogComponent,
    FormComponent,
    LoginFormComponent,
    RegisterComponent,
    PostEntryComponent,
    ViewPostComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    FormsModule,
    RouterModule,
    HOME_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [
    PostsService
  ]
})
export class HomeModule { }
