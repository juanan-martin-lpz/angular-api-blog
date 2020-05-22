import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/loginservice';
import { Router } from '@angular/router';
import { Profile } from '../../../models/profile';
import { Usuario } from '../../../models/usuario';
import { ProfileService } from '../../../services/profile.service';
import { pluck, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  pass: string;

  constructor(private loginService: LoginService, private profileService: ProfileService, private router: Router) {

    const user: Usuario = loginService.getLoggedUser();

    profileService.getProfile(user).pipe(
      tap(console.log),
      pluck('user'),
      tap(console.log)
    )
    .subscribe((u: Profile) => this.profile = u);
   }

  ngOnInit(): void {
  }

  guardarProfile(f: NgForm) {

    this.profileService.saveProfile(this.profile).subscribe((resp: any) => {
      if (!resp.status) {
        console.log(resp.error);
      }

      this.router.navigate(['/blog']);
    });
  }

  cancelarProfile() {
    this.router.navigate(['/blog']);
  }
}
