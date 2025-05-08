import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupDataType } from 'src/types/popup-data.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import {DefaultResponseType} from "../../../../types/default-response.type";
import {ArticlesService} from "../../services/articles.service";
import {MatSnackBar} from "@angular/material/snack-bar";

interface Title {
  value: string;
}

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  orderTitle: string = '';
  isOrder: boolean = true;
  optionTitle: string = '';
  showForm: boolean = true;
  callMeBack: boolean = false;
  buttonText: string = '';
  selectedValue!: string;

  form!: FormGroup;
  titles: Title[] = [
    {value: 'Создание сайтов'},
    {value: 'Продвижение', },
    {value: 'Реклама'},
    {value: 'Копирайтинг'}
  ];
  // form: FormGroup = this.fb.group({
  //   // title: [this.selectedValue, Validators.required],
  //   name: ['', [Validators.required]],
  //   phone: ['', [Validators.required]],
  //
  // })

  private subscription: Subscription = new Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PopupDataType,
    private articleService: ArticlesService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupComponent>, private _snackBar: MatSnackBar) {
    this.orderTitle = data.orderTitle;
    this.optionTitle = data.optionTitle;
    this.callMeBack = data.callMeBack;
    this.buttonText = data.buttonText;

    const optionTitle = this.titles.find(title => title.value === data.optionTitle);
    this.selectedValue = optionTitle ? optionTitle.value : this.titles[0].value;
    this.form = this.fb.group({
      title: [this.selectedValue, Validators.required],
      name: ['', [Validators.required, Validators.pattern('^[A-ZА-Я][a-zа-яё]*$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9()-\\s]*$')]]
    });
  }


  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  get name() {
    return this.form.get('name')
  }
  get phone() {
    return this.form.get('phone')
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  sendRequestOrder(): void {
    const requestData = {
      name: this.form.get('name')?.value,
      phone: this.form.get('phone')?.value,
      type: 'order',
      // service: this.form.get('title')?.value
      service: this.optionTitle

    };
    if (this.callMeBack) {
      requestData['type'] = 'consultation';
    } else {
      requestData['type'] = 'order';
    }

    this.subscription?.add(this.articleService.addUserRequest(requestData)
      .subscribe({
        next: (data: DefaultResponseType) => {
          let error = null;
          if (data.error) {
            error = data.message;

          } else {
            this.openPopupThanks('Спасибо за вашу заявку!');
          }
          if (error) {
            this._snackBar.open('Произошла ошибка при отправке формы');
            throw new Error(error);
          }
        }
      }));
  }


  openPopupThanks(orderTitle: string): void {
    this.showForm = false;
    this.isOrder = false;
    this.orderTitle = orderTitle;
  }


}
