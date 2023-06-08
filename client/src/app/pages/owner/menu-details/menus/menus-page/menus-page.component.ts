import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Menu } from 'src/app/core/entities/menu';
import { GetMenus } from 'src/app/state/menu.state';
import { AddRestaurantDetails} from 'src/app/state/restaurant.state';


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
    this.getMenus();
    this.showToolbarDetails();
  }
  getMenus(){
    this.store.select(state => state.restaurant).subscribe(res => {
       if(res.Menus.length > 0){
        this.menus = res.Menus
       }
       else{
        this.menuService.getRestDetails(+this.auth.getRestId()).subscribe(res => {
          this.menus = res.Menus;
          this.store.dispatch(new AddRestaurantDetails({
            restaurant: res
          }))
        })
       }
    });
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
