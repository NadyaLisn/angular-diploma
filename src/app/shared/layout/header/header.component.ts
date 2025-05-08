import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {UserInfoType} from "../../../../types/user-info.type";
import {ActiveParamsType} from "../../../../types/active-params.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  userName: string | undefined = '';
  activeParams: ActiveParamsType = {categories: []};
  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router,) {
    this.isLogged = this.authService.getIsLoggedIn();
    if (this.isLogged) {
      this.userName = this.authService.getUserInfoArt()?.name;
    }
  }
  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams,
    });
  }
  ngOnInit(): void {
    // this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
    //   this.isLogged = isLoggedIn;
    // })

    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
      const accessToken = this.authService.getTokens().accessToken;
      if (isLoggedIn && accessToken) {
        this.authService.getUserInfo(accessToken).subscribe((data: UserInfoType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            console.log((data as DefaultResponseType).message);
            throw new Error((data as DefaultResponseType).message);
          }
          this.authService.setUserInfo(data as UserInfoType);
          this.userName = (data as UserInfoType).name;
        });
      } else {
        this.userName = '';
      }
    })
  }
  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      })
  }
  scrollTo(fragment: string) {
    setTimeout(() => {
      document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
    });
  }

}
