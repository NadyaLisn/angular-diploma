import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-popup-thanks',
  templateUrl: './popup-thanks.component.html',
  styleUrls: ['./popup-thanks.component.scss']
})
export class PopupThanksComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  closePopup() {
    this.dialog.closeAll()
  }

}
