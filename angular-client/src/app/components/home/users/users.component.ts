import { Component, OnInit, Input } from '@angular/core';

import { LoginService } from '../../../services/usersservice';

import { Observable } from 'rxjs';

import { Post } from '../../../models/post';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ LoginService ]
})
export class UsersComponent implements OnInit {

  public posts: Post[];

  constructor(private _usersService: LoginService) { }

  ngOnInit(): void {

  }

}
