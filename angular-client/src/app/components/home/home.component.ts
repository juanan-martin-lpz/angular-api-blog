import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() userSigned = false;
  @Input() userToken = '';

  @Output() loginSuccess = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onUserLogued(event) {

    this.userSigned = event.signed;
    this.userToken = event.token;

    console.log(this.userToken);

    this.loginSuccess.emit({ signed: true });

  }
}
