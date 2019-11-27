import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';


@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.scss']
})
export class SensorDetailComponent implements OnInit {

  constructor() { }

  sensorName = 'Sensor A001';
  image = 'https://robu.in/wp-content/uploads/2017/05/voltage-sensor-1.png';
  description = 'lLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. ' +
    'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ' +
    'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ';

  values = [
    {name: 'Naam' , value: 'Warmte sensor'},
    {name: 'Status' , value: 'Aan'},
    {name: 'Soort data' , value: 'Graden'},
  ];

  ngOnInit() {
  }

}
