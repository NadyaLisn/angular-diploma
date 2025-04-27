import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {ArticleBodyType} from "../../../../types/article-body.type";
import {ArticlesService} from "../../../shared/services/articles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {Subscription} from "rxjs";
import {UserInfoType} from "../../../../types/user-info.type";
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentsService} from "../../../shared/services/comments.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {CommentsResponseType, CommentType} from "../../../../types/comments-response.type";


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  article!: ArticleBodyType;
  relatedArticle: ArticleType[] = [];
  serverStaticPath: string = environment.serverStaticPath;
  userInfo: UserInfoType | null = null;
  isLogged: boolean = false;
  comments: CommentType[] = [];
  commentCountOnPage: number = 0;

  private subscription: Subscription = new Subscription();

  constructor(private articleService: ArticlesService, private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService, private _snackBar: MatSnackBar,
              private commentsService: CommentsService,
  ) {
    this.isLogged = this.authService.getIsLoggedIn();
    if (this.authService.getIsLoggedIn()) {
      this.userInfo = this.authService.getUserInfoArt();
    }
  }

  ngOnInit(): void {
    this.subscription.add(this.authService.isLogged$.subscribe((data: boolean) => {
        if (data) {
          this.userInfo = this.authService.getUserInfoArt();
          this.isLogged = true;
        } else {
          this.userInfo = null;
          this.isLogged = false;
        }
      })
    )
    this.subscription.add(this.activatedRoute.params.subscribe(params => {
        if (params) {

          this.articleService.getArticle(params['url'])
            .subscribe(data => {
              this.article = data;
              // this.comments = data.comments;
            });

          this.articleService.getRelatedArticles(params['url'])
            .subscribe(data => {
              this.relatedArticle = data
            });
        }
      })
    )

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }


}
