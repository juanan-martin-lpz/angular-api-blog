import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/loginservice';



@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

  token: string;

  constructor() {
    this.loadToken();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    this.loadToken();

    // Si hay un token en el localStorage el usuario se ha logueado correctamente
    if (this.token) {

      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
      const request = req.clone({headers});

      return next.handle(request);

    }
    else {                      // Si no lo hay no ponemos ninguna cabecera
      return next.handle(req);
    }


  }

  loadToken() {
    if (localStorage.getItem('token') != null && localStorage.getItem('token').length > 0 ) {
      this.token = localStorage.getItem('token');
    }
    else {
      this.token = null;
    }
  }
}
