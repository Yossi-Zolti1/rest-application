import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Item } from 'src/app/core/entities/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { AddRestaurantDetails } from 'src/app/state/restaurant.state';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.css']
})
export class ItemsPageComponent implements OnInit {
  buttonText: string = 'הוסף מנה'
  route!: string
  departmentId!:string
  departmentName!:string
  isAuth = false;
  userName: string = "";
  items!: Item[]
  constructor(private routes: ActivatedRoute,private auth: AuthService, 
    private menuService: MenuDetailsService, private router: Router, private store: Store) { }
  public items$!:Observable<Item[]>
  ngOnInit(): void {
    this.departmentId = this.routes.snapshot.paramMap.get('departmentId')!;
    this.route = `/add-item/${this.departmentId}`
    this.getItems();
    this.departmentName = history.state.name;
    this.showToolbarDetails();
  }
  getItems(){
    this.store.select(state => state.restaurant.Menus.flatMap((menu: { Departments: any; }) => menu.Departments)
    .find((department: { id: number; }) => department.id === +this.departmentId)?.Items).subscribe(res => {
      if(res != undefined){
       this.items = res
      }
      else{
       this.menuService.getRestDetails(+this.auth.getRestId()).subscribe(res => {
         this.items = res.Menus.flatMap(menu => menu.Departments).find(department => department?.id === +this.departmentId)?.Items!;
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
    this.items$ = this.menuService.getItems(+this.departmentId)
  }

}
