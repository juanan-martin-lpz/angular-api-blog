import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { LoginService } from '../../services/loginservice';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Usuario;

  constructor(private loginService: LoginService, private router: Router) {

    this.user = new Usuario('', '', '', '', '');
  }

  ngOnInit(): void {

  }


  guardar(f: NgForm) {
    this.loginService.register(this.user).subscribe( (resp: any) =>{
      console.log(resp);
      this.router.navigate(['/login']);
    });
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
