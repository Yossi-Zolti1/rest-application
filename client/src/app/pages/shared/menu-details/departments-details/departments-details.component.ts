import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Department } from 'src/app/core/entities/menu';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { AddRestaurantDetails } from 'src/app/state/restaurant.state';

@Component({
  selector: 'app-departments-details',
  templateUrl: './departments-details.component.html',
  styleUrls: ['./departments-details.component.css']
})
export class DepartmentsDetailsComponent implements OnInit {
menuId!:string
restId!:string
departments!: Department[]
  constructor(private menusService: MenuDetailsService, private routes: ActivatedRoute,
    private store: Store) { }

  ngOnInit(): void {
    this.menuId = this.routes.snapshot.paramMap.get('menuId')!;
    this.restId = this.routes.snapshot.paramMap.get('restId')!;
    this.getDepartments();
  }
  getDepartments(){
    this.store.select(state => state.restaurant.Menus.find((menu: { id: number; }) => menu.id === +this.menuId)?.Departments).subscribe(res => {
      if(res != undefined){
       this.departments = res
      }
      else{
       this.menusService.getRestDetails(+this.restId).subscribe(res => {
         this.departments = res.Menus.find(menu => menu.id === +this.menuId)?.Departments!;
         this.store.dispatch(new AddRestaurantDetails({
           restaurant: res
         }))
       })
      }
   });

  }

}
