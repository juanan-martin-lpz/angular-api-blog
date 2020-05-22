import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _http: HttpClient) {

  }

  getAll() {

    return this._http.get('http://localhost:3000/api/v1/blog').pipe(
      pluck('posts')
    );
  }
}
