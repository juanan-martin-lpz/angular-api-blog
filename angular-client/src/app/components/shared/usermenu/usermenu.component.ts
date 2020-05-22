import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/loginservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styles: [
  ]
})
export class UsermenuComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/blog']);
  }
}
