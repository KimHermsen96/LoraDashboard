import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DataService, MyService } from '../data.service';

@Component({
  selector: 'app-sensor-overview',
  templateUrl: './sensor-overview.component.html',
  styleUrls: ['./sensor-overview.component.scss']
})
export class SensorOverviewComponent implements OnInit {
  // private map;
  public selectedOption: string;
  public sensorListChanged = false;
  sensors: string[] = [];
  ids: string[] = [];

  // tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 19,
  //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  // });

  constructor(private dataService: DataService, private myService: MyService) {
    this.myService.myMethod(this.selectedOption);
    this.myService.myMethod2(this.sensorListChanged);

    this.myService.myMethod2$.subscribe((value) => {
      if (value) {
        this.getData();
        this.selectedOption = '';
        this.myService.myMethod(this.selectedOption);
      }
    });
  }

  ngOnInit() {
    this.getData();
    // this.initMap();
    // this.tiles.addTo(this.map);
  }
  private getData() {
    this.sensors = [];
    this.ids = [];
    this.dataService.sendGetRequest().subscribe((data: any[]) => {
      data.forEach((element) => {
        this.sensors.push(element.Name);
        this.ids.push(element.id);
      });
    });
  }

  private valueChanged() {
    this.myService.myMethod(this.selectedOption);
  }
}
