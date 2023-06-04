import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/core/entities/menu';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { RestaurantDetailsService } from 'src/app/services/restaurant-details.service';

@Component({
  selector: 'app-menus-details',
  templateUrl: './menus-details.component.html',
  styleUrls: ['./menus-details.component.css']
})
export class MenusDetailsComponent implements OnInit {
  restId!: string
  constructor(private menusService: MenuDetailsService, private routes: ActivatedRoute) { }
  public menus$!: Observable<Menu[]>
  ngOnInit(): void {
    this.restId = this.routes.snapshot.paramMap.get('restId')!;
    this.menus$ = this.menusService.getMenus(+this.restId);
  }

}
