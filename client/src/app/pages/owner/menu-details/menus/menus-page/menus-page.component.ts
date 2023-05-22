import { Component, OnInit } from '@angular/core';
import { MenuDetailsService } from 'src/app/services/menu-details.service';


@Component({
  selector: 'app-menus-page',
  templateUrl: './menus-page.component.html',
  styleUrls: ['./menus-page.component.css']
})
export class MenusPageComponent implements OnInit {
  title: string = 'צור את התפריט שלך'
  buttonText: string = 'הוסף תפריט'
  route: string = 'create-menu'
  constructor(private menuService: MenuDetailsService) { }
  public menus$ = this.menuService.getMenus();
  ngOnInit(): void {
  }
  
}
