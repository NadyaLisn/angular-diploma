import { Component, OnInit } from '@angular/core';
import {PopupThanksComponent} from "../popup-thanks/popup-thanks.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-popup-consultation',
  templateUrl: './popup-consultation.component.html',
  styleUrls: ['./popup-consultation.component.scss']
})
export class PopupConsultationComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openPopupThanks() {
    this.dialog.open(PopupThanksComponent)
  }

}
