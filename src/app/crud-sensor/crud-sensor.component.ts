import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DialogService} from '../dialog.service';
import {DataService, MyService} from '../data.service';

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
    private dialogservice: DialogService,
    private dataService: DataService,
    private myService: MyService
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      status: '',
      type: '',
      dataType: '',
      location: '',
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

  private validateForm(formvalue) {
    const formvalues = [formvalue.name, formvalue.type, formvalue.dataType, formvalue.status, formvalue.location];
    formvalues.forEach( val => {
      if (val.length < 2  || !val) {
        this.addMessage( val + ' is verplicht en  mag niet meer dan 80 karakters lang zijn' );
      }
    });
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
        console.log(formvalue);
        this.dataService.sendInsertRequest(formvalue).subscribe((data: any) => {
            console.log(data);
            this.message[0] = 'Uw sensor is succesvol opgeslagen in de database';
            this.dialogservice.openDialog(this.message, true);
            this.checkoutForm = this.formBuilder.group({
                name: '',
                status: '',
                type: '',
                dataType: '',
                location: '',
                description: ''
            });
        });
    }
  }
}
