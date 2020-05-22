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


  constructor(private http: HttpClient, public router: Router) {
    this.usuario = null;
    this.token = '';

    this.loadStorage();
  }

  saveStorage(user: Usuario, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    this.loadStorage();
  }

  isLogged() {
    this.loadStorage();

    return (this.usuario !== null) ? true : false;
  }

  loadStorage() {

    if ((localStorage.getItem('token') !== null)) {
      this.usuario = JSON.parse(localStorage.getItem('user')) || null;
      this.token = localStorage.getItem('token');
    }
    else {
      this.usuario = null;
      this.token = '';
    }
  }

  getToken() {
    return this.token;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.loadStorage();

    this.router.navigate(['login']);

  }

  getLoggedUser() {
    return this.usuario;
  }

  login(usr: Login): Observable<any> {

    return this.http.post('http://localhost:3000/login', usr);

  }

  register(usr: Usuario): Observable<any> {

    usr.firstname = 'Nuevo';
    usr.lastname = 'Usuario';

    return this.http.post('http://localhost:3000/signup', usr);

  }

}
