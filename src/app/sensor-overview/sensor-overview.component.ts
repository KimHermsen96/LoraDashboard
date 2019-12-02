import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DataService, MyService } from '../data.service';

@Component({
  selector: 'app-sensor-overview',
  templateUrl: './sensor-overview.component.html',
  styleUrls: ['./sensor-overview.component.scss']
})
export class SensorOverviewComponent implements OnInit {
  private map;
  public selectedOption: string;

  tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  constructor(private dataService: DataService, private myService: MyService) {
    this.myService.myMethod(this.selectedOption);
  }


  sensors: string[] = [];
  ids: string[] = [];


  ngOnInit() {
    // this.initMap();
    this.tiles.addTo(this.map);

    this.dataService.sendGetRequest().subscribe((data: any[]) => {
      data.forEach((element) => {
        this.sensors.push(element.Name);
        this.ids.push(element.id);
      });
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [51.69917, 5.30417],
      zoom: 12
    });
  }

  private valueChanged() {
    this.myService.myMethod(this.selectedOption);
  }
}
