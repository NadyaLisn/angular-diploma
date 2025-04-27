import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {ArticleCardComponent} from "../../../shared/components/article-card/article-card.component";
import {ArticlesService} from "../../../shared/services/articles.service";
import {CategoriesType} from "../../../../types/categories.type";
import {AppliedFilterType} from "../../../../types/applied-filter.type";
import {CategoryService} from "../../../shared/services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsUtil} from "../../../shared/utils/active-params.util";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit,  OnDestroy {

  articles: ArticleType[] = [];
  categories: CategoriesType[] = [];
  appliedFilters: AppliedFilterType[] = [];
  activeParams: ActiveParamsType = {categories: []};
  pages: number[] = [];
  private subscription: Subscription = new Subscription();
  constructor(private articlesService: ArticlesService,  private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // this.articlesService.getArticles()
    //   .subscribe(data => {
    //     this.articles = data.items
    //   })

    this.subscription.add( this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data;
        this.subscription.add(this.activatedRoute.queryParams
          .subscribe(params => {
            this.activeParams = ActiveParamsUtil.processParams(params);
            this.appliedFilters = [];
            this.activeParams.categories.forEach(url => {
              const foundName = this.categories.find(item => item.url === url);
              if (foundName) {
                this.appliedFilters.push({
                  name: foundName.name,
                  urlParam: url
                })
              }
            });
            this.subscription.add(this.articlesService.getArticles(this.activeParams)
              .subscribe(data => {
                this.pages = [];
                for (let i = 1; i <= data.pages; i++) {
                  this.pages.push(i);
                }
                this.articles = data.items;
              }))
          }))
      }));
  }

  removeAppliedFilter(appliedFilter: AppliedFilterType) {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.urlParam);
    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      })
    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      })
    }
  }


}
