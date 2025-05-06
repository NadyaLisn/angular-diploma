import {Component, Input, OnInit} from '@angular/core';
import {CategoriesType} from "../../../../types/categories.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActiveParamsUtil} from "../../utils/active-params.util";

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
  @Input() categories: CategoriesType[] | null = null;
  open = false;
  activeParams: ActiveParamsType = {categories: []};
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe( params => {
      this.activeParams = ActiveParamsUtil.processParams(params);
      if (params['categories']) {
        this.activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']]
      }
    })
  }

  toggle():void {
    this.open = !this.open;
  }

  updateFilterParam (url: string, checked: boolean) {

    if(this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingCategoryInParams = this.activeParams.categories.find(item => item === url);
      if (existingCategoryInParams && !checked) {
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);
      } else if (!existingCategoryInParams && checked) {
        this.activeParams.categories = [...this.activeParams.categories, url];
      }
    } else if (checked) {
      this.activeParams.categories = [url]
    }
    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }


  closeFilter() {
    this.open = false;
  }

}
