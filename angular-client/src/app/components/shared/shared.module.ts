import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopheaderComponent } from './topheader/topheader.component';
import { DefaultmenuComponent } from './defaultmenu/defaultmenu.component';
import { UsermenuComponent } from './usermenu/usermenu.component';


@NgModule({
  declarations: [
    TopheaderComponent,
    DefaultmenuComponent,
    UsermenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopheaderComponent,
    DefaultmenuComponent,
    UsermenuComponent
  ]
})
export class SharedModule { }
