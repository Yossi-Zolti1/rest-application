import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { Router } from '@angular/router';


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
  constructor(private menuService: MenuDetailsService, private auth: AuthService, private router: Router) { }
  public menus$ = this.menuService.getMenus(+this.auth.getRestId());

  ngOnInit(): void {
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
