import { Component, OnInit } from '@angular/core';
import { appRoutes } from '../app.module';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  routes = appRoutes;

  constructor() { }

  ngOnInit() {
  }

}
