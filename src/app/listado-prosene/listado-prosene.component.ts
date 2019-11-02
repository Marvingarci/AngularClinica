import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-prosene',
  templateUrl: './listado-prosene.component.html',
  styleUrls: ['./listado-prosene.component.css']
})
export class ListadoProseneComponent implements OnInit {

  events: string[] = [];
  opened: boolean;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor() { }

  ngOnInit() {
  }

}
