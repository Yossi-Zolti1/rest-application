import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Item } from 'src/app/core/entities/menu';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { AddRestaurantDetails } from 'src/app/state/restaurant.state';

@Component({
  selector: 'app-items-details',
  templateUrl: './items-details.component.html',
  styleUrls: ['./items-details.component.css']
})
export class ItemsDetailsComponent implements OnInit {
  departmentId!: string
  restId!: string
  items!: Item[]
  constructor(private menusService: MenuDetailsService, private routes: ActivatedRoute,
    private store: Store) { }
   
  ngOnInit(): void {
    this.restId = this.routes.snapshot.paramMap.get('restId')!;
    this.departmentId = this.routes.snapshot.paramMap.get('departmentId')!;
    this.getItems()
  }
  getItems(){
    this.store.select(state => state.restaurant.Menus.flatMap((menu: { Departments: any; }) => menu.Departments)
    .find((department: { id: number; }) => department.id === +this.departmentId)?.Items).subscribe(res => {
      if(res != undefined){
       this.items = res
      }
      else{
       this.menusService.getRestDetails(+this.restId).subscribe(res => {
         this.items = res.Menus.flatMap(menu => menu.Departments).find(department => department?.id === +this.departmentId)?.Items!;
         this.store.dispatch(new AddRestaurantDetails({
           restaurant: res
         }))
       })
      }
   });
  }

}
