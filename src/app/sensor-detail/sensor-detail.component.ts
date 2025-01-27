import { Component, OnInit } from '@angular/core';
import { DataService, MyService } from '../data.service';
import { AppComponent } from '../app.component';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.scss']
})
export class SensorDetailComponent implements OnInit {
  public selectedOption: string;

  sensorName = '-';
  image;
  description = '-';
  APIlink = '-';
  sensorData = [];

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
      private appComponent: AppComponent,
      private sanitizer: DomSanitizer
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
            this.APIlink = '-';
            this.image = '';
            this.sensorData = [];
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
              this.APIlink = this.dataService.getAPIlink() + this.selectedOption;
              if (data.Image !== '' && data.Image !== null) {
                  this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data.Image);
              } else {
                  this.image = '';
              }
            });
            this.dataService.sendGetRequest(value, 1).subscribe((data: any) => {
                this.sensorData = [];
                for (const i in data) {
                    if (parseInt(i) < 30) { //TODO: Weg halen / veranderen, laat nu maar 30 resultaten zien.
                        console.log(data[i]);
                        this.sensorData.push(data[i]);
                    }
                }
            });
          }
        }
    );
    this.image = '';
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
        this.image = '';
        this.sensorData = [];
        this.myService.myMethod2(true);
    });
  }
  navigate(x) {
      this.appComponent.navigate(x);
  }

}
