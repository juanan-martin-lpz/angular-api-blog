import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent }

];

// tslint:disable-next-line: variable-name
export const home_routing = RouterModule.forChild(appRoutes);
