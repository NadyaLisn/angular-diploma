import {NgModule} from "@angular/core";
import {ServicesCardComponent} from './components/services-card/services-card.component';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {ArticleCardComponent} from './components/article-card/article-card.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { PopupOrderComponent } from './components/popups/popup-order/popup-order.component';
import {MatDialogModule} from "@angular/material/dialog";

import { PopupThanksComponent } from './components/popups/popup-thanks/popup-thanks.component';
import { PopupConsultationComponent } from './components/popups/popup-consultation/popup-consultation.component';


@NgModule({
  declarations: [
    ServicesCardComponent,
    ArticleCardComponent,
    CategoryFilterComponent,
    PopupOrderComponent,
    PopupThanksComponent,
    PopupConsultationComponent,
  ],
  imports: [
    NgForOf,
    NgIf,
    RouterModule,
    CommonModule,
    FormsModule,
    MatDialogModule,

  ],
    exports: [
        ServicesCardComponent,
        ArticleCardComponent,
        CategoryFilterComponent
    ],
})
export class SharedModule {
}
