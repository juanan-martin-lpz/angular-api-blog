
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, ɵangular_packages_common_http_http_a, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Post } from '../models/post';


@Injectable()
export class PostsService {

  constructor(private _http: HttpClient) {

  }

  getAllPost(): Observable<Post[]>{

    let tokenItem = { token: localStorage.getItem('token')};

    let header = new HttpHeaders().set("Authorization","Bearer " + tokenItem.token);

    return this._http.get<Post[]>('http://localhost:3000/api/v1/post/all', { responseType: 'json', headers: header });
  }
}
