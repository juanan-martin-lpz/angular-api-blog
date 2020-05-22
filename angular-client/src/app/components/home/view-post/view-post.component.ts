import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../services/postsservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  post: Post;

  constructor(private postService: PostsService, private routeParams: ActivatedRoute) {


    // tslint:disable-next-line:no-string-literal
    const id = routeParams.snapshot.params['id'];

    postService.getPost(id).subscribe( (p: any) => {

      this.post = p.post;
    });

  }

  ngOnInit(): void {
  }

}
