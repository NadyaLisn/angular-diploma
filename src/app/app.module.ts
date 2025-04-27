import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {LayoutComponent} from './shared/layout/layout.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {SharedModule} from "./shared/shared.module";
import {MainComponent} from './views/main/main.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarouselModule} from "ngx-owl-carousel-o";
import { HttpClientModule} from "@angular/common/http";

import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        BrowserAnimationsModule,
        CarouselModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        FormsModule,
        MatMenuModule
    ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
