import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, ɵangular_packages_common_http_http_a, HttpRequest } from '@angular/common/http';

import { Login } from '../models/login';
import { SignedUserData } from '../models/signeduser';
import { Observable } from 'rxjs';
import { BoundTextAst } from '@angular/compiler';


@Injectable()
export class LoginService {

  constructor(private _http: HttpClient) {

  }

  login(usr: Login): Observable<any> {

    return this._http.post('http://localhost:3000/login', usr);

  }
}
