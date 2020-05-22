
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, ɵangular_packages_common_http_http_a, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { LoginService } from './loginservice';
import { tap, map, pluck } from 'rxjs/operators';
import { UploadFileService } from './uploadFile.service';


@Injectable()
export class PostsService {

  constructor(private _http: HttpClient, private loginService: LoginService, private uploadFile: UploadFileService) {

  }

  getAll() {

    return this._http.get('http://localhost:3000/api/v1/posts').pipe(
      pluck('posts')
    );
  }

  getPost(id: string) {
    return this._http.get<Post>('http://localhost:3000/api/v1/posts/' + id);
  }

  savePost(post: Post) {
    return this._http.post('http://localhost:3000/api/v1/posts', post);
  }

  updatePost(post: Post) {
    return this._http.put('http://localhost:3000/api/v1/posts/' + post._id, post);
  }

  uploadImage(id: string, image: File) {

    return this.uploadFile.uploadFile(image, id);

  }
}
