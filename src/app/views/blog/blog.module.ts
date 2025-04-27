import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import {BlogComponent} from "./blog/blog.component";
import {SharedModule} from "../../shared/shared.module";
import {ArticleComponent} from "./article/article.component";
import {FormsModule} from "@angular/forms";
import { CommentComponent } from './comment/comment.component';


@NgModule({
  declarations: [  BlogComponent, ArticleComponent, CommentComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class BlogModule { }
