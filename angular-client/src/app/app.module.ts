import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { HomeModule } from './components/home/home.module';
import { LoginGuard } from './guards/login.guard';
import { LoginService } from './services/loginservice';
import { AuthorizationService } from './interceptors/authorization.service';
import { RouterModule } from '@angular/router';
import { UploadFileService } from './services/uploadFile.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    routing,
    HttpClientModule,
    SharedModule,
    HomeModule
  ],
  providers: [
    appRoutingProviders,
    LoginService,
    LoginGuard,
    UploadFileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
