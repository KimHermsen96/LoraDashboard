import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DialogService} from '../dialog.service';

@Component({
  selector: 'app-crud-sensor',
  templateUrl: './crud-sensor.component.html',
  styleUrls: ['./crud-sensor.component.scss']
})
export class CrudSensorComponent implements OnInit {
  checkoutForm;
  selectedFile;
  message: string[] = [];
  srcResult;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialogservice: DialogService
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      status: '',
      data_type: '',
      lat: '',
      lon: '',
      description: ''
    });
  }

  ngOnInit() {
  }


  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  private checkLatAndLon(formvalue, latorLon) {

    console.log(formvalue);
    let max = 180;
    let min = -180;
    let value = formvalue.lon;
    let returnString = 'Longtitude is een nummer tussen de -180 en 180. Vul de numerieke waarde in.';

    if (latorLon === 'lat') {
      max = 90;
      min = -90;
      value = formvalue.lat;
      returnString = 'Latitude is een nummer tussen de -90 en 90. Vul de numerieke waarde in.';
    }


    if (!value || value > max || value < min || Number.isNaN(value)) {
      return returnString;
    }
  }

  private validateForm(formvalue) {
    this.addMessage(this.checkLatAndLon(formvalue, 'lat'));
    this.addMessage(this.checkLatAndLon(formvalue, 'lon'));
    this.addMessage(this.checkName(formvalue));
    this.addMessage(this.checkDataType(formvalue));
  }

  private checkName(formvalue) {
    if (formvalue.name.length >= 30 || !formvalue.name) {
      return 'De naam is verplicht en mag maximaal 30 karakters lang zijn';
    }
  }

  private checkDataType(formvalue) {
    if (formvalue.data_type >= 30  || !formvalue.data_type) {
      return 'Het data type is verplicht en mag maximaal 30 karakters lang zijn.';
    }
  }

  private addMessage(message) {
    if (message) {
      this.message.push(message);
    }
  }

  onSubmit(formvalue) {
    this.validateForm(formvalue);

    if (this.message.length > 0) {
      this.dialogservice.openDialog(this.message, false);
      this.message.forEach( m => {
        console.log(m);
      });
      this.message = [];
    } else {
      this.message[0] = 'Uw sensor is succesvol opgeslagen in de database';
      this.dialogservice.openDialog(this.message, true);
    }
  }
}