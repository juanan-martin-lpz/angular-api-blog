import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, ɵangular_packages_common_http_http_a, HttpRequest } from '@angular/common/http';

import { Login } from '../models/login';
import { SignedUserData } from '../models/signeduser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoundTextAst, InterpolationConfig, tokenName } from '@angular/compiler';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { TestObject } from 'protractor/built/driverProviders';


interface LoginResponse {
  status: boolean;
  message: string;
  user: Usuario;
  token: string;
}

@Injectable()
export class LoginService {

  usuario: Usuario;
  token: string;

  constructor(private _http: HttpClient, public route: Router) {
    this.usuario = null;
    this.token = '';

    this.loadStorage();
  }

  saveStorage(user: Usuario, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    this.loadStorage();
  }

  loadStorage() {

    if (localStorage.getItem('token').length > 0) {
      this.usuario = JSON.parse(localStorage.getItem('user')) || null;
      this.token = localStorage.getItem('token');
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.usuario = null;
    this.token = '';

  }



  login(usr: Login): Observable<any> {

    return this._http.post('http://localhost:3000/login', usr).pipe(
      map((resp: LoginResponse) => {

        if (resp.status) {
          this.saveStorage(resp.user, resp.token)
          this.route.navigate(['/blog']);

        }


      })

    );

  }
}
