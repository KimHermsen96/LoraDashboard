import { Injectable } from '@angular/core';
import {DialogComponent} from './dialog-component/dialog.component';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }
  messages;
  openDialog(m) {
    this.messages = [];
    this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: {message: m},
    });
    this.messages  = m;
  }
}
