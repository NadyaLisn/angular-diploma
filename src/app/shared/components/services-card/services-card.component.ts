import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../popup/popup.component";
import {Subscription} from "rxjs";


@Component({
  selector: 'services-card',
  templateUrl: './services-card.component.html',
  styleUrls: ['./services-card.component.scss']
})
export class ServicesCardComponent implements OnInit {
  services = [
    {
      title: 'Создание сайтов',
      image: 'card-site.png',
      description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: 7500
    },
    {
      title: 'Продвижение',
      image: 'card-pro.png',
      description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: 3500
    },
    {
      title: 'Реклама',
      image: 'card-advertisement.png',
      description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: 1000
    },
    {
      title: 'Копирайтинг',
      image: 'card-copy.png',
      description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: 750
    },
  ];


  constructor(private dialog: MatDialog) {
  }

  isOrder: boolean = false;
  callMeBack: boolean = false;
  private subscription: Subscription = new Subscription;

  openPopupOrder(orderTitle: string, optionTitle: string, buttonText: string): void {
    this.isOrder = true;
    this.callMeBack = false;

    this.dialog.open(PopupComponent, {
      data: {
        orderTitle: orderTitle,
        optionTitle: optionTitle,
        isCallMeBack: this.callMeBack,
        buttonText: buttonText
      }
    });

  }


  ngOnInit(): void {
  }

}
