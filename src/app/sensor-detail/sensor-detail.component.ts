import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { DataService, MyService } from '../data.service';

@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.scss']
})
export class SensorDetailComponent implements OnInit {

  public selectedOption: string;
  sensorName = '-';
  description = '-';

  constructor(private dataService: DataService, private myService: MyService) {
    this.myService.myMethod$.subscribe((value) => {
        this.selectedOption = value;
        if (!this.selectedOption) {
          // Undefined
          this.values = [
            {name: 'Naam' , value: '-'},
            {name: 'Status' , value: '-'},
            {name: 'Type' , value: '-'},
            {name: 'Soort data' , value: '-'},
            {name: 'Locatie' , value: '-'},
          ];
          this.sensorName = '-';
          this.description = '-';
        } else {
          // Not undefined
          this.dataService.sendGetRequest(value).subscribe((data: any) => {
            console.log(data);
            // TODO: Specifieke sensor ophalen die geselecteerd is
            this.values = [
              {name: 'Naam', value: data.Name},
              {name: 'Status' , value: data.Status},
              {name: 'Type' , value: data.Type},
              {name: 'Soort data' , value: data.DataType},
              {name: 'Locatie' , value: data.Location},
            ];
            this.sensorName = data.Name;
            this.description = data.Description;
          });
        }
      }
    );
  }


  image = 'https://robu.in/wp-content/uploads/2017/05/voltage-sensor-1.png';


  values = [
    {name: 'Naam' , value: '-'},
    {name: 'Status' , value: '-'},
    {name: 'Type' , value: '-'},
    {name: 'Soort data' , value: '-'},
    {name: 'Locatie' , value: '-'},
  ];

  ngOnInit() {
  }

}
