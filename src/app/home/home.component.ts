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
  editSensor;

  constructor() {
  }

  ngOnInit() {
    this.overviewDetail = false;
    this.addSensor = true;
    this.editSensor = true;
  }

  navigate(view) {

    this.overviewDetail = true;
    this.addSensor = true;
    this.editSensor = true;

    switch (view) {
      case 'overzicht':
        this.overviewDetail = false;
        break;
      case 'add_sensor':
        this.addSensor = false;
        break;
      case 'edit_sensor':
        this.editSensor = false;
        break;
      default:
        this.overviewDetail = false;
        break;

    }
  }

}
