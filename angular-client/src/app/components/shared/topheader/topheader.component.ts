import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { LoginService } from '../../../services/loginservice';


@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.css'],
})
export class TopheaderComponent implements OnInit {

  userSigned: boolean;

  constructor(private loginService: LoginService){}

  ngOnInit(): void {
    this.userSigned = this.loginService.isLogged();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck(): void {
    this.userSigned = this.loginService.isLogged();
  }

  logout(){
    this.loginService.logout();
  }
}
