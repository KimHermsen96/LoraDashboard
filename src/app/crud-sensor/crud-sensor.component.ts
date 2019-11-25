import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule} from '@angular/material';

@Component({
  selector: 'app-crud-sensor',
  templateUrl: './crud-sensor.component.html',
  styleUrls: ['./crud-sensor.component.scss']
})
export class CrudSensorComponent implements OnInit {
  checkoutForm;
  srcResult;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      status: ''
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



}
