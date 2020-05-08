import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'blog', component: LoginFormComponent },
  { path: 'post', component: LoginFormComponent,
                  children: [
                    {path: '', component: LoginFormComponent},
                    {path: 'new', component: LoginFormComponent},
                    {path: 'edit', component: LoginFormComponent},
                  ]},

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
