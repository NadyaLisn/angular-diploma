import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';

import {ReactiveFormsModule} from "@angular/forms";
import { SignUpComponent } from './sign-up/sign-up.component';
import {SharedModule} from "../../shared/shared.module";
import { PolicyComponent } from './policy/policy.component';



@NgModule({
  declarations: [
 LoginComponent,
 SignUpComponent,
 PolicyComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
