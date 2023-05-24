import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MenuDetailsService } from 'src/app/services/menu-details.service';


@Component({
  selector: 'app-menus-page',
  templateUrl: './menus-page.component.html',
  styleUrls: ['./menus-page.component.css']
})
export class MenusPageComponent implements OnInit {
  title: string = 'צור את התפריט שלך'
  buttonText: string = 'הוסף תפריט'
  route: string = '/create-menu'
  constructor(private menuService: MenuDetailsService, private auth: AuthService) { }
  public menus$ = this.menuService.getMenus(+this.auth.getRestId());
  ngOnInit(): void {
  }
  
}
