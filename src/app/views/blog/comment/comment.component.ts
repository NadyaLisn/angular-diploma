import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CommentType} from "../../../../types/comments-response.type";
import {Subscription} from "rxjs";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentsService} from "../../../shared/services/comments.service";
import {DefaultResponseType} from "../../../../types/default-response.type"
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActionsType} from "../../../../types/actions.type";
import {ActionEnum} from "../../../../types/action.enum";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy{
  @Input() comment!: CommentType;
  @Output() reactionEvent: EventEmitter<{ commentId: string, reaction: ActionEnum | null }> = new EventEmitter<{ commentId: string, reaction: ActionEnum | null }>();

  isLogged: boolean;
  userReaction: ActionEnum | null = null
  reactionEnum = ActionEnum;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private commentsService: CommentsService, private _snackBar: MatSnackBar,) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    if (this.isLogged) {
      this.subscription.add(this.commentsService.getReactionComment(this.comment.id)
        .subscribe({
          next: (data) => {
            if ((data as DefaultResponseType).error) {
              throw new Error((data as DefaultResponseType).message)
            }
            if (data && (data as ActionsType []).length > 0) {
              this.userReaction = (data as ActionsType[])[0].action;
            } else if ((data as ActionsType []).length === 0) {
              this.userReaction = null
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log(error)
          }
        }))
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  reactionToComment(reaction: ActionEnum, commentsId: string) {
    if (this.isLogged) {
      this.subscription.add(this.commentsService.sendReaction(reaction, commentsId)
        .subscribe({
          next: data => {
            if (data.error) {
              this._snackBar.open(data.message)
            } else {
              this._snackBar.open('Ваш голос учтен' );

              this.getReaction();
            }
          },
          error: (error: HttpErrorResponse) => {
            this._snackBar.open(error.error.message)
          }
        }))
    }
  }
  complaintToComment(reaction: ActionEnum, commentsId: string) {
    if (this.isLogged) {
      this.subscription.add(this.commentsService.sendReaction(reaction, commentsId)
        .subscribe({
          next: data => {
            if (data.error) {
              this._snackBar.open(data.message)
            } else {
              this._snackBar.open('Жалоба отправлена' );

              this.getReaction();
            }
          },
          error: () => this._snackBar.open('Жалоба уже отправлена')
        }))
    }
  }

  getReaction(): void {
    if (this.isLogged) {
      this.subscription.add(this.commentsService.getReactionComment(this.comment.id)
        .subscribe({
          next: (data) => {
            if ((data as DefaultResponseType).error) {
              throw new Error((data as DefaultResponseType).message)
            }
            if (data && (data as ActionsType []).length > 0) {
              this.userReaction = (data as ActionsType[])[0].action;
            } else if ((data as ActionsType []).length === 0) {
              this.userReaction = null
            }
            this.changeReaction(this.userReaction)
          },
          error: (error: HttpErrorResponse) => {
            this._snackBar.open(error.error.message)
          }
        }))
    }
  }

  changeReaction(reaction: ActionEnum | null) {
    this.reactionEvent.emit({commentId: this.comment.id, reaction: reaction});
  }
}
