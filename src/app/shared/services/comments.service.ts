import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CommentsResponseType} from "../../../types/comments-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(offset: number, articleId: string): Observable<CommentsResponseType | DefaultResponseType> {
    return this.http.get<CommentsResponseType | DefaultResponseType>(environment.api + 'comments', {
      params: {
        offset,
        article: articleId
      }
    });
  }
}
