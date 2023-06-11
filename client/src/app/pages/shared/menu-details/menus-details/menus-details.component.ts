import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/core/entities/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { RestaurantDetailsService } from 'src/app/services/restaurant-details.service';
import { AddRestaurantDetails } from 'src/app/state/restaurant.state';

@Component({
  selector: 'app-menus-details',
  templateUrl: './menus-details.component.html',
  styleUrls: ['./menus-details.component.css']
})
export class MenusDetailsComponent implements OnInit {
  restId!: string
  menus!: Menu[]
  constructor(private menusService: MenuDetailsService, private routes: ActivatedRoute,
    private store: Store, private auth: AuthService) { }
  public menus$!: Observable<Menu[]>
  ngOnInit(): void {
    this.restId = this.routes.snapshot.paramMap.get('restId')!;
    this.getMenus();
    this.menus$ = this.menusService.getMenus(+this.restId);
  }
  getMenus(){
    this.store.select(state => state.restaurant).subscribe(res => {
       if(res.Menus.length > 0){
        this.menus = res.Menus
       }
       else{
        this.menusService.getRestDetails(+this.restId).subscribe(res => {
          this.menus = res.Menus;
          this.store.dispatch(new AddRestaurantDetails({
            restaurant: res
          }))
        })
       }
    });
  }
}
