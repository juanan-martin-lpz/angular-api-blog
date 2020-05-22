import { Component, OnInit, Output } from '@angular/core';
import { Post } from '../../../models/post';
import { PostsService } from '../../../services/postsservice';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../../services/loginservice';

import bsCustomFileInput from 'bs-custom-file-input';
import { EventEmitter } from 'events';
import { from } from 'rxjs';

@Component({
  selector: 'app-post-entry',
  templateUrl: './post-entry.component.html',
  styleUrls: ['./post-entry.component.css']
})
export class PostEntryComponent implements OnInit {

  thePost: Post;
  imagen: File;
  imagenTemp: string;
  updating = false;



  constructor(private postService: PostsService,
              private loginService: LoginService ,
              private router: Router,
              private routeParams: ActivatedRoute) {

                this.thePost = new Post();

              }

  ngOnInit(): void {

    bsCustomFileInput.init();



    // tslint:disable-next-line: no-string-literal
    const id = this.routeParams.snapshot.params['id'];

    if (id !== 'new') {
      this.postService.getPost(id).subscribe( (resp: any) => {
        this.thePost = resp.post;
        this.updating = true;
      });
    }

  }

  guardarPost( f: NgForm) {

    this.thePost.user = this.loginService.getLoggedUser();

    if (!this.updating) {

      this.thePost.image = 'Sin asignar';

      this.postService.savePost(this.thePost).subscribe( (result: any) => {

        this.thePost = result.post;

        if (result.status) {
          if (this.imagen !== undefined) {
            this.postService.uploadImage(this.thePost._id, this.imagen).then(resp => {
              this.router.navigate(['/blog']);
            })
            .catch(err => {

              console.log(err);
              this.router.navigate(['/blog']);

            });
          }
        }

        this.router.navigate(['/blog']);

      });
    }
    else {
      this.postService.updatePost(this.thePost).subscribe( (result: any) => {

        this.thePost = result.post;

        if (result.status) {

          if (this.imagen !== undefined) {
            this.postService.uploadImage(this.thePost._id, this.imagen).then(resp => {

              this.router.navigate(['/blog']);

            })
            .catch(err => {

              console.log(err);
              this.router.navigate(['/blog']);

            });
          }

          this.router.navigate(['/blog'])
        }
      });
    }

  }

  cancelarPost() {

    this.router.navigate(['/blog']);

  }

  seleccionImagen( archivo: File ) {

    console.log('seleccion Image');
    if ( !archivo ) {
      console.log('Archivo null');
      this.imagen = null;
      return;
    }

    console.log('Archivo OK');
    this.imagen = archivo;

    const reader = new FileReader();
    reader.readAsDataURL( archivo );

    console.log('Archivo en imageTemp');
    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }
}
