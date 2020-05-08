import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Login } from '../../models/login';
import { SignedUserData } from '../../models/signeduser';

import { LoginService } from '../../services/loginservice';
import { TopheaderComponent } from '../shared/topheader/topheader.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [LoginService]
})
export class LoginFormComponent implements OnInit {

  public user: Login;
  @Output() loginSuccess = new EventEmitter();

  // tslint:disable-next-line: variable-name
  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
    this.user = new Login();
  }

  onSubmit() {
    // Valida contra el API
    this._loginService.login(this.user).subscribe(
      response => {
        if (response.user) {
          localStorage.setItem('token', response.token);
          this.loginSuccess.emit({ signed: true, token: response.token });

        }
        else {
          this.loginSuccess.emit({ signed: false, token: '' });
        }
      },
      error => {
        console.log('error en el login, no user');
        this.loginSuccess.emit({ signed: false, token: '' });
      }
    );

  }
}
