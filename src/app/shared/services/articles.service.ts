import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ArticlesType, ArticleType} from "../../../types/article.type";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CategoriesType} from "../../../types/categories.type";
import {ActiveParamsType} from "../../../types/active-params.type";
import {ArticleBodyType} from "../../../types/article-body.type";

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
  getArticle(url: string): Observable<ArticleBodyType> {
    return this.http.get<ArticleBodyType>(environment.api + 'articles/' + url);
  }
  getCategoriesArticles(): Observable<CategoriesType[]> {
    return this.http.get<CategoriesType[]>(environment.api + 'categories');
  }
  getRelatedArticles(url: string): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/related/' + url);
  }
}
