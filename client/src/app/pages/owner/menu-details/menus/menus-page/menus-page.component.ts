import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Menu } from 'src/app/core/entities/menu';
import { GetMenus } from 'src/app/state/menu.state';
import { GetRestDetails } from 'src/app/state/restaurant.state';


@Component({
  selector: 'app-menus-page',
  templateUrl: './menus-page.component.html',
  styleUrls: ['./menus-page.component.css']
})
export class MenusPageComponent implements OnInit {
  title: string = 'צור את התפריט שלך'
  buttonText: string = 'הוסף תפריט'
  route: string = '/create-menu'
  isAuth = false;
  userName: string = "";
  menus: Menu[] = [];
  constructor(private menuService: MenuDetailsService, private auth: AuthService, 
    private router: Router, private store: Store) { }
  public menus$ = this.menuService.getMenus(+this.auth.getRestId());

  ngOnInit(): void {
    ////עבודה עם ה-state/////
    // const restId = +this.auth.getRestId();
    // this.store.dispatch(new GetRestDetails(restId)).subscribe(() => {
    //   this.store.select(state => state.menus.menus).subscribe(menus => {
    //     this.menus = menus;
    //   });
    // });
    // this.store.dispatch(new GetMenus(restId)).subscribe(() => {
    //   this.store.select(state => state.menus.menus).subscribe(menus => {
    //     this.menus = menus;
    //   });
    // });
    this.showToolbarDetails();
  }
  
  showToolbarDetails(): void {
    let auth = this.auth.checkAuth();
    if (auth) {
      this.isAuth = true;
      this.userName = this.auth.getUserName();
    }else{
      this.isAuth = false;
      this.router.navigate(["/"]);
    }
  }

  refreshList(){
    this.menus$ = this.menuService.getMenus(+this.auth.getRestId());
  }

}
