import {NgModule} from "@angular/core";
import {ServicesCardComponent} from './components/services-card/services-card.component';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {ArticleCardComponent} from './components/article-card/article-card.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import {MatDialogModule} from "@angular/material/dialog";

import {MatButtonModule} from "@angular/material/button";

import {PopupComponent} from "./components/popup/popup.component";
import {MatSelectModule} from "@angular/material/select";

import {ClickOutsideDirective} from "./directives/click-outside.directive";
import {DateCommentPipe} from "./pipes/date-comment.pipe";


import {LoaderComponent} from "./components/loader/loader.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
@NgModule({
  declarations: [
    ServicesCardComponent,
    ArticleCardComponent,
    CategoryFilterComponent,
    PopupComponent,
    DateCommentPipe,
    LoaderComponent
  ],
  imports: [
    NgForOf,
    NgIf,
    RouterModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    ClickOutsideDirective,
    MatProgressSpinnerModule

  ],
  exports: [
    ServicesCardComponent,
    ArticleCardComponent,
    CategoryFilterComponent,
    DateCommentPipe,
    LoaderComponent
  ],
})
export class SharedModule {
}
