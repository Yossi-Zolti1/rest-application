import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Department } from 'src/app/core/entities/menu';
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
  public departments$!:Observable<Department[]>
  constructor(private routes: ActivatedRoute, private menuService: MenuDetailsService) { }

  ngOnInit(): void {
    this.menuId = this.routes.snapshot.paramMap.get('menuId')!;
    this.route = `/add-department/${this.menuId}`
    this.departments$ = this.menuService.getDepartments(+this.menuId)
  }
  
}
