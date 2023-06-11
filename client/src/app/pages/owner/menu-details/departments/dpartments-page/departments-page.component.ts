import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Department } from 'src/app/core/entities/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { AddRestaurantDetails } from 'src/app/state/restaurant.state';
@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css']
})
export class DepartmentsPageComponent implements OnInit {
  title:string = 'הוסף מחלקות לתפריט שלך'
  buttonText: string = 'הוסף מחלקה'
  route!: string
  menuId!:string
  isAuth = false;
  userName: string = "";
  menuName!:string
  departments!: Department[]
  public departments$!:Observable<Department[]>
  constructor(private routes: ActivatedRoute,private auth: AuthService, 
    private menuService: MenuDetailsService, private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.menuId = this.routes.snapshot.paramMap.get('menuId')!;
    this.getDepartments();
    this.route = `/add-department/${this.menuId}`
    this.menuName = history.state.name;
    this.showToolbarDetails();
  }
  getDepartments(){
    this.store.select(state => state.restaurant.Menus.find((menu: { id: number; }) => menu.id === +this.menuId)?.Departments).subscribe(res => {
       if(res != undefined){
        this.departments = res
       }
       else{
        this.menuService.getRestDetails(+this.auth.getRestId()).subscribe(res => {
          this.departments = res.Menus.find(menu => menu.id === +this.menuId)?.Departments!;
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
    this.departments$ = this.menuService.getDepartments(+this.menuId);
  }
}
