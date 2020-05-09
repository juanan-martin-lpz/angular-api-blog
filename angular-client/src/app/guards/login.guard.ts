import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/loginservice';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}
  canActivate() {

    if (this.loginService.isLogged()) {
      console.log('guard true');
      return true;
    }
    else {
      console.log('guard false');
      this.router.navigate(['login']);
    }
  }
}
