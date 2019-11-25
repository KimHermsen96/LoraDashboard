import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // @ViewChild
  overviewDetail;
  addSensor;
  settings;

  constructor() {
  }

  ngOnInit() {
    this.overviewDetail = false;
    this.settings = true;
    this.addSensor = true;
  }

  navigate(view) {

    this.overviewDetail = true;
    this.settings = true;
    this.addSensor = true;

    switch (view) {
      case 'overzicht':
        this.overviewDetail = false;
        break;
      case 'settings' :
        this.settings = false;
        break;
      case 'add_sensor':
        this.addSensor = false;
        break;
      default:
        this.overviewDetail = false;
        break;

    }
  }

}
