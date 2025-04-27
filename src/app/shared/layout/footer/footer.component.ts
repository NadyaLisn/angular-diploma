import { Component, OnInit } from '@angular/core';
import {PopupOrderComponent} from "../../components/popups/popup-order/popup-order.component";
import {MatDialog} from "@angular/material/dialog";
import {PopupConsultationComponent} from "../../components/popups/popup-consultation/popup-consultation.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openPopupConsultation() {
    this.dialog.open(PopupConsultationComponent)
  }
}
