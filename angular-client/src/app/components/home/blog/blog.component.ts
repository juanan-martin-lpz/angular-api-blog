import { Component, OnInit, DoCheck, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Post } from '../../../models/post';
import { BlogService } from '../../../services/blog.service';
import { map, pluck, tap } from 'rxjs/operators';
import { LoginService } from '../../../services/loginservice';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts: Post[];

  excerptContent: string;

  constructor(private blogService: BlogService, private loginService: LoginService) {

    this.leerPosts();

  }

  ngOnInit(): void {
  }

  leerPosts() {

    this.blogService.getAll().subscribe((r: any) => {
      this.posts = r;
    });
  }

  canEdit(p: Post) {

    const userLogged = this.loginService.getLoggedUser();

    if (p.user && userLogged && userLogged._id === p.user._id) {
      return true;
    }
    else {
      return false;
    }

  }

  obtenerImagen(id: string) {
    return `http://localhost:3000/api/v1/posts/images/${id}?nocache=${new Date().getMilliseconds()}`;
  }
}
