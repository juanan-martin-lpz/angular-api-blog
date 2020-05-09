import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    UsersComponent,
    BlogComponent,
    FormComponent,
    LoginFormComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HOME_ROUTING,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
