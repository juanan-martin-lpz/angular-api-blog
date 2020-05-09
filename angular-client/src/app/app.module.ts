import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { HomeModule } from './components/home/home.module';
import { LoginGuard } from './guards/login.guard';
import { LoginService } from './services/loginservice';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    SharedModule,
    HomeModule
  ],
  providers: [
    appRoutingProviders,
    LoginService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
