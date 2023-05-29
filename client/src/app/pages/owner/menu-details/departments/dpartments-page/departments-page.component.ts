import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Department } from 'src/app/core/entities/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
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
  public departments$!:Observable<Department[]>
  constructor(private routes: ActivatedRoute,private auth: AuthService, 
    private menuService: MenuDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.menuId = this.routes.snapshot.paramMap.get('menuId')!;
    this.route = `/add-department/${this.menuId}`
    this.departments$ = this.menuService.getDepartments(+this.menuId)
    this.menuName = history.state.name;
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
}
