import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Observable, throwError } from 'rxjs';



import { Login } from '../../models/login';
import { SignedUserData } from '../../models/signeduser';

import { LoginService } from '../../services/loginservice';
import { Usuario } from '../../models/usuario';
import { LoginResponse } from '../../models/loginresponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [LoginService]
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  @Output() loginSuccess = new EventEmitter();

  // tslint:disable-next-line: variable-name
  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl( null , Validators.required ),
      password: new FormControl( null , Validators.required )
    });
  }

  onSubmit() {
    // Valida contra el API

    const user = new Login(
      this.loginForm.value.name,
      this.loginForm.value.password

    );

    console.log(user);

    this._loginService.login(user).subscribe(
      (response: LoginResponse) => {


        if (response.status === true) {

          const usuario = new Usuario(
            response.user._id,
            response.user.name,
            '',
            '',
            ':)'
          );

          this._loginService.saveStorage(usuario, response.token);

          this.router.navigate(['blog']);

        }
      },
      error => {
        console.log(error);
        console.log('error en el login, no user');
        this.loginSuccess.emit({ signed: false, token: '' });
      }
    );

  }
}
