import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DialogService} from '../dialog.service';
import {DataService, MyService} from '../data.service';

@Component({
  selector: 'app-edit-sensor',
  templateUrl: './edit-sensor.component.html',
  styleUrls: ['./edit-sensor.component.scss']
})
export class EditSensorComponent implements OnInit {
  checkoutForm;
  selectedFile = 0;
  message: string[] = [];
  srcResult;
  base64textString = '';
  public selectedOption: string;

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
      description: '',
      image: ''
    });

    this.myService.myMethod$.subscribe((value) => {
      console.log(value);
      this.selectedOption = value;
      if (!this.selectedOption) {
        // Undefined
        this.checkoutForm = this.formBuilder.group({
          name: '',
          status: '',
          type: '',
          dataType: '',
          location: '',
          description: '',
          image: ''
        });
        this.selectedFile = 0;
      } else {
        // Not undefined
        this.dataService.sendGetRequest(value).subscribe((data: any) => {
          console.log(data);
          // Specifieke sensor ophalen die geselecteerd is
          this.checkoutForm = this.formBuilder.group({
            name: data.Name,
            status: data.Status,
            type: data.Type,
            dataType: data.DataType,
            location: data.Location,
            description: data.Description,
            image: data.Image
          });
          this.selectedFile = 0;
        });
      }
    });
  }

  ngOnInit() {
  }


  onFileSelected() {
    const inputNode2: any = document.querySelector('#file2');
    const file = inputNode2.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
      console.log('test2: ');
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.selectedFile = 1;
    console.log(this.base64textString);
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
    if (this.base64textString !== '') {
      formvalue.image = this.base64textString;
    } else {
      formvalue.image = this.checkoutForm.image;
    }

    if (this.message.length > 0) {
      this.dialogservice.openDialog(this.message, false);
      this.message.forEach( m => {
        console.log(m);
      });
      this.message = [];
    } else {
      console.log(formvalue);
      this.dataService.sendUpdateRequest(this.selectedOption, formvalue).subscribe((data: any) => {
        console.log(data);
        this.message[0] = 'Uw sensor is succesvol opgeslagen in de database';
        this.dialogservice.openDialog(this.message, true);
        this.checkoutForm = this.formBuilder.group({
          name: '',
          status: '',
          type: '',
          dataType: '',
          location: '',
          description: '',
          image: ''
        });
        this.base64textString = '';
        this.selectedFile = 0;
        this.myService.myMethod2(true);
      });
    }
  }
}
