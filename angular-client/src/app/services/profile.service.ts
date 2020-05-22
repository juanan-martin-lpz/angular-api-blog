import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {

   }

   getProfile(user: Usuario) {
    return this.http.get(`http://localhost:3000/api/v1/users/${user._id}`);
   }

   saveProfile(profile: Profile) {

     return this.http.put(`http://localhost:3000/api/v1/users/${profile._id}`, profile);
   }
}
