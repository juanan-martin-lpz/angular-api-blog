import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angular-client';

  constructor(private router: Router) {}

  @Input() userSigned: boolean;

  onUserLogued(event) {

    console.log(event);

    this.userSigned = event.signed;

    this.router.navigate(['blog']);

  }
}
