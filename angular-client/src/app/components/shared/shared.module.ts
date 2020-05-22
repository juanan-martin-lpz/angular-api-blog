import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopheaderComponent } from './topheader/topheader.component';
import { DefaultmenuComponent } from './defaultmenu/defaultmenu.component';
import { UsermenuComponent } from './usermenu/usermenu.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TopheaderComponent,
    DefaultmenuComponent,
    UsermenuComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  exports: [
    TopheaderComponent,
    DefaultmenuComponent,
    UsermenuComponent
  ]
})
export class SharedModule { }
