import { Component, OnInit } from '@angular/core';
import { DataService, MyService } from '../data.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.scss']
})
export class SensorDetailComponent implements OnInit {
  public selectedOption: string;

  sensorName = '-';
  image = 'https://robu.in/wp-content/uploads/2017/05/voltage-sensor-1.png';
  description = '-';

  values = [
    {name: 'Naam' , value: '-'},
    {name: 'Status' , value: '-'},
    {name: 'Type' , value: '-'},
    {name: 'Soort data' , value: '-'},
    {name: 'Locatie' , value: '-'},
  ];

  constructor(
      private dataService: DataService,
      private myService: MyService,
      private appComponent: AppComponent
  ) {
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
              // Specifieke sensor ophalen die geselecteerd is
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

  ngOnInit() {
  }

  deleteSensor() {
    console.log(this.selectedOption);
    this.dataService.sendDeleteRequest(this.selectedOption).subscribe((data: any) => {
        console.log(data);
        this.values = [
            {name: 'Naam' , value: '-'},
            {name: 'Status' , value: '-'},
            {name: 'Type' , value: '-'},
            {name: 'Soort data' , value: '-'},
            {name: 'Locatie' , value: '-'},
        ];
        this.myService.myMethod2(true);
    });
  }
  navigate(x) {
      this.appComponent.navigate(x);
  }

}
