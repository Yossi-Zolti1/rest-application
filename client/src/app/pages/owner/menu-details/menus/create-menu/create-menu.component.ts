import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/core/entities/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {
  formData: FormData = new FormData();
  menu!:Menu
  menuId!:string
  imageUrl!:string
  isMenuExixst: boolean = false
  constructor(public fb: FormBuilder, private menuService: MenuDetailsService, private route: Router
    ,private auth: AuthService, private routes: ActivatedRoute) { }
  menuForm = this.fb.group({
    name: ['']
  })
  ngOnInit(): void {
    this.menuId = this.routes.snapshot.paramMap.get('menuId')!;
    if(this.menuId != null){
      this.menuService.getSingleMenu(+this.menuId).subscribe(res => {
        this.menuForm.patchValue({
          name: res.name
        })
        this.imageUrl = environment.baseUrl + res.image!
        this.isMenuExixst = true
      })
    }
  }
  createMenu(){
    this.formData.append('name', this.menuForm.controls['name'].value)
    this.formData.append('reatId', this.auth.getRestId())
    this.menuService.addMenu(this.formData).subscribe(res => {
      if(res === 400 || res === 403){
        alert('ההוספה נכשלה')
      }
      else{
        this.route.navigate(['menus-page']);
      }
    })
  }
  updateMenu(){
    this.formData.append('menuId', this.menuId)
    this.formData.append('name', this.menuForm.controls['name'].value)
    this.formData.append('reatId', this.auth.getRestId())
    this.menuService.updateMenu(this.formData).subscribe(res => {
      if(res === 400 || res === 403){
        alert('העדכון נכשלה')
      }
      else{
        this.route.navigate(['menus-page']);
      }
    })
  }
  onFileSelected(e: any) {
    this.formData.append('my', e.target.files[0])
  }
}
