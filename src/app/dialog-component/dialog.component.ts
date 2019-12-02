import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../dialog.service';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogService: DialogService
    ) { }

  ngOnInit() {
  }

}
