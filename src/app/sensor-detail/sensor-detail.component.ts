import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { DataService } from '../data.service';


@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.scss']
})
export class SensorDetailComponent implements OnInit {

  constructor(private dataService: DataService) { }

  sensorName = 'Sensor A001';
  image = 'https://robu.in/wp-content/uploads/2017/05/voltage-sensor-1.png';
  description = 'lLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. ' +
    'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ' +
    'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ';

  values = [
    {name: 'Naam' , value: 'Warmte sensor 1'},
    {name: 'Status' , value: 'Aan'},
    {name: 'Type' , value: 'Temperatuur sensor'},
    {name: 'Soort data' , value: 'Graden'},
    {name: 'Locatie' , value: 'IOT Lab'},
  ];

  ngOnInit() {
    // this.dataService.sendGetRequest().subscribe((data: any[]) => {
    //   console.log(data);
    //   this.values = data;
    // });
  }

}
