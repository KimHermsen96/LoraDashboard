import {Injectable} from '@angular/core';
import {DialogComponent} from './dialog-component/dialog.component';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  accomplished;
  messages;

  constructor(private dialog: MatDialog) {
  }

  openDialog(m, accomplished) {
    this.messages = [];
    this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: {message: m},
    });
    this.accomplished = [];
    this.messages = [];
    if (accomplished) {
      this.accomplished = m;
    } else {
      this.messages = m;
    }
  }
}
