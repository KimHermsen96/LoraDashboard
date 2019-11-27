import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sensor-overview',
  templateUrl: './sensor-overview.component.html',
  styleUrls: ['./sensor-overview.component.scss']
})
export class SensorOverviewComponent implements OnInit {
  private map;
  private apiUrl = '192.168.1.45:3000/device/all';

  tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  constructor(
    private http: HttpClient
  ) { }

  sensors: string[] = [
    'A001', 'A004', 'A003', 'A002'
  ];


  ngOnInit() {
    this.initMap();
    this.tiles.addTo(this.map);
    console.log(this.http.get(this.apiUrl));

  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
  }
}
