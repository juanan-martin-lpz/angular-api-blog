import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { LoginService } from '../../services/loginservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() userSigned = false;
  @Input() userToken = '';

  @Output() loginSuccess = new EventEmitter();

  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {

  }

}
