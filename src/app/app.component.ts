import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeComponent} from './home/home.component';
/** @title Sidenav with custom escape and backdrop click behavior */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class AppComponent implements OnInit {

  // @ts-ignore
  @ViewChild(HomeComponent) homecomponent: HomeComponent;

  events: string[] = [];
  opened: boolean;

  constructor() { }
  ngOnInit() {
    console.log(this.homecomponent);
  }

  navigate(x) {
    this.homecomponent.navigate(x);
  }

}
