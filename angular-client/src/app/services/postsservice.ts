
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, ɵangular_packages_common_http_http_a, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { LoginService } from './loginservice';


@Injectable()
export class PostsService {

  constructor(private _http: HttpClient, private loginService: LoginService) {

  }

  getAll(): Observable<Post[]>{

    // Esto va en el interceptor
    const header = new HttpHeaders().set("Authorization","Bearer " + this.loginService.getToken());

    return this._http.get<Post[]>('http://localhost:3000/api/v1/posts', { responseType: 'json', headers: header });
  }
}
