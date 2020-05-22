import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginGuard } from './guards/login.guard';


const appRoutes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginFormComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {  onSameUrlNavigation: 'reload', urlUpdateStrategy: 'eager'});
