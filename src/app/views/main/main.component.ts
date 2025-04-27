import {Component, Input, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleType} from "../../../types/article.type";
import {ArticlesService} from "../../shared/services/articles.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  // @Input() article!: ArticleType;


  bestArticles: ArticleType[] = [];
  banners = [
    {
      title1: 'Предложение месяца',
      title2: 'Продвижение в Instagram для вашего бизнеса <span class="text-blue-color">-15%</span>!',
      image: 'banner-1.png',
      description: ''
    },
    {
      title1: 'Акция',
      title2: 'Нужен грамотный <span class="text-blue-color">копирайтер</span>?',
      image: 'banner-2.png',
      description: 'Весь декабрь у нас действует акция на работу копирайтера.',
    },
    {
      title1: 'Новость дня',
      title2: '<span class="text-blue-color">6 место</span> в ТОП-10 SMM-агенств Москвы!',
      image: 'banner-3.png',
      description: 'Мы благодарим каждого, кто голосовал за нас!',
    },
  ];

  reviews = [
    {
      name: 'Станислав',
      image: 'review1.png',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями!' +
        ' Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      name: 'Алёна',
      image: 'review2.png',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! ' +
        'Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю,' +
        ' с нетерпением хочется выложить в сеть.'
    },
    {
      name: 'Мария',
      image: 'review3.png',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: ' +
        'от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
  ]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  };

  customOptionsRev: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 26,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: false
  };
  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getBestArticles().subscribe((data:ArticleType[]) => {
      this.bestArticles = data;
    });
  }

}
