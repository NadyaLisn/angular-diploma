import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ArticlesType, ArticleType} from "../../../types/article.type";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CategoriesType} from "../../../types/categories.type";
import {ActiveParamsType} from "../../../types/active-params.type";

import {UserRequestType} from "../../../types/user-request.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {ArticleTextType} from "../../../types/article-text.type";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  getBestArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }

  getArticles(params: ActiveParamsType): Observable<ArticlesType> {
    return this.http.get<ArticlesType>(environment.api + 'articles', {
      params: params
    });
  }
  getArticle(url: string): Observable<ArticleTextType> {
    return this.http.get<ArticleTextType>(environment.api + 'articles/' + url);
  }

  addUserRequest(userRequest: UserRequestType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests', userRequest);
  }
  getCategoriesArticles(): Observable<CategoriesType[]> {
    return this.http.get<CategoriesType[]>(environment.api + 'categories');
  }
  getRelatedArticles(url: string): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/related/' + url);
  }
}
