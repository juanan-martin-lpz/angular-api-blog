import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/loginservice';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}
  canActivate() {

    return this.loginService.isLogged();
  }
}
