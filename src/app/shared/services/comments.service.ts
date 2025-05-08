import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CommentsResponseType} from "../../../types/comments-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {UserActionsType} from "../../../types/user-actions.type";
import {ActionsType} from "../../../types/actions.type";
import {ActionEnum} from "../../../types/action.enum";




@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(offset: number, id: string): Observable<CommentsResponseType | DefaultResponseType> {
    return this.http.get<CommentsResponseType | DefaultResponseType>(environment.api + 'comments', {
      params: {
        offset,
        article: id
      }
    });
  }

  addNewComment(text: string, article:string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType> (environment.api + 'comments', {
      text,
      article
    })
  }


  getReactionComment(commentId: string): Observable<ActionsType [] | DefaultResponseType> {
    return this.http.get<ActionsType [] | DefaultResponseType>(environment.api + 'comments/' + commentId + '/actions');
  }
  getArticleCommentsReactions(articleId: string): Observable<ActionsType [] | DefaultResponseType> {
    return this.http.get<ActionsType [] | DefaultResponseType>(environment.api + 'comments/article-comment-actions', {
      params: {
        articleId
      }
    });
  }
  sendReaction(reaction: string, articleId: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + articleId + '/apply-action', {
      action: reaction
    })
  }
}
