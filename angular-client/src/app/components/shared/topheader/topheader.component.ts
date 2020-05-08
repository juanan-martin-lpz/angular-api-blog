import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';


@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.css'],
})
export class TopheaderComponent implements OnInit {


  @Input() userSigned: boolean;

  constructor(){}

  ngOnInit(): void {
  }
}
