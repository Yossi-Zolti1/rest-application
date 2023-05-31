import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from 'src/app/core/entities/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenuDetailsService } from 'src/app/services/menu-details.service';

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
  constructor(private routes: ActivatedRoute,private auth: AuthService, 
    private menuService: MenuDetailsService, private router: Router) { }
  public items$!:Observable<Item[]>
  ngOnInit(): void {
    this.departmentId = this.routes.snapshot.paramMap.get('departmentId')!;
    this.route = `/add-item/${this.departmentId}`
    this.items$ = this.menuService.getItems(+this.departmentId)
    this.departmentName = history.state.name;
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
    this.items$ = this.menuService.getItems(+this.departmentId)
  }

}
