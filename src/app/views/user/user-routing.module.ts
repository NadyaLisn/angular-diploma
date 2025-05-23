import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {PolicyComponent} from "./policy/policy.component";


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignUpComponent},
  {path:'policy', component: PolicyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
