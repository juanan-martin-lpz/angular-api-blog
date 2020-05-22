import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { LoginGuard } from '../../guards/login.guard';
import { PostEntryComponent } from './post-entry/post-entry.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [

  { path: '', redirectTo: 'blog', pathMatch: 'full' },

  { path: 'blog', component: BlogComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'post', canActivate: [LoginGuard], component: BlogComponent },
  { path: 'post/new', canActivate: [LoginGuard], component: PostEntryComponent},
  { path: 'post/edit/:id', canActivate: [LoginGuard], component: PostEntryComponent},
  { path: 'post/:id', canActivate: [LoginGuard], component: ViewPostComponent },
  { path: 'users', canActivate: [LoginGuard], component: UsersComponent }


];

// tslint:disable-next-line: variable-name
export const HOME_ROUTING = RouterModule.forChild(appRoutes);
