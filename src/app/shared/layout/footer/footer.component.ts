import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {PopupComponent} from "../../components/popup/popup.component";
import {MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isOrder: boolean = false;
  callMeBack: boolean = true;
  phone: string = '';
  private subscription: Subscription | null = null;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openPopupOrder(orderTitle: string, buttonText: string): void {
    this.callMeBack = true;
    this.isOrder = true;

    this.dialog.open(PopupComponent, {
      data: {
        orderTitle: orderTitle,
        callMeBack: this.callMeBack,
        buttonText: buttonText
      }
    });

  }
}
