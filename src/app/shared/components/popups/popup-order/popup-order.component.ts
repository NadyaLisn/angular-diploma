import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PopupThanksComponent} from "../popup-thanks/popup-thanks.component";

@Component({
  selector: 'app-popup-order',
  templateUrl: './popup-order.component.html',
  styleUrls: ['./popup-order.component.scss']
})
export class PopupOrderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openPopupThanks() {
    this.dialog.open(PopupThanksComponent)
  }
  closePopup() {
    this.dialog.closeAll()
  }
}
