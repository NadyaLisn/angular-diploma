import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
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
import {FormBuilder, NgForm} from "@angular/forms";
import {ArticleTextType} from "../../../../types/article-text.type";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  article!: ArticleTextType;
  relatedArticle: ArticleType[] = [];
  serverStaticPath: string = environment.serverStaticPath;
  userInfo: UserInfoType | null = null;
  isLogged: boolean = false;
  comments: CommentType[] = [];
  commentCountOnPage: number = 0;
  commentForm = {
    comment: ''
  };
  accessToken: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private articleService: ArticlesService, private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService, private _snackBar: MatSnackBar,
              private commentsService: CommentsService, private fb: FormBuilder,
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
              this.commentCountOnPage = data.commentsCount >= 3 ? 3 : data.commentsCount;
              this.article.text = data.text
              this.comments = data.comments;
              // this.commentsService.getComments(data.comments.length, data.id).subscribe()
              // this.getCommentsArticle()
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

  getCommentsArticle() {
    this.subscription.add(this.commentsService.getComments(this.commentCountOnPage, this.article.id)
      .subscribe(data => {
        if ((data as DefaultResponseType).error) {
          throw new Error((data as DefaultResponseType).message);
        }
        this.comments = [...this.comments, ...(data as CommentsResponseType).comments];
        this.article.commentsCount = (data as CommentsResponseType).allCount;
        this.commentCountOnPage += (data as CommentsResponseType).comments.length;

      })
    )
  }

  addComment(newComment: NgForm) {
    this.commentsService.addNewComment(this.commentForm.comment, this.article.id)
      .subscribe({
        next: (data: DefaultResponseType) => {
          this.commentForm.comment = '';
          newComment.reset();
          console.log(this.commentForm.comment, this.article.id)
          this.updateArticles();
        },
        error: (error: HttpErrorResponse) => {
          if (error.error && error.message) {
            this._snackBar.open(error.error.message)
          } else {
            this._snackBar.open('Ошибка, не получилось добавить комментарий')
          }
        }
      })
  }
  updateArticles() {
    this.subscription.add(this.articleService.getArticle(this.article.url)
      .subscribe({
        next: (data) => {
          this.comments = [data.comments[0], ...this.comments]
          this.article.comments = data.comments;
          this.article.commentsCount = data.commentsCount;
          this.commentCountOnPage++;
        },
        error: (error) => {
          this._snackBar.open(error.error.message)
        }
      })
    )
  }

}
