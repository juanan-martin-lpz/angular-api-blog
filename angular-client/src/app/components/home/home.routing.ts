import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';
import { UserformComponent } from '../shared/userform/userform.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { LoginGuard } from '../../guards/login.guard';
import { FormComponent } from './post/form/form.component';

const appRoutes: Routes = [

  { path: '', canActivate: [LoginGuard] , component: BlogComponent },

  { path: 'blog', canActivate: [LoginGuard], component: BlogComponent },
  { path: 'post/:id', canActivate: [LoginGuard],
                  children: [
                    {path: ':id', component: FormComponent},
                    {path: 'new', component: FormComponent},
                    {path: 'edit/:id', component: FormComponent},
                  ]},
  { path: 'users', component: UsersComponent }


];

// tslint:disable-next-line: variable-name
export const HOME_ROUTING = RouterModule.forChild(appRoutes);
