import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MenuDetailsService } from 'src/app/services/menu-details.service';


@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {

  constructor(public fb: FormBuilder, private menuService: MenuDetailsService, private route: Router
    ,private auth: AuthService) { }
  menuForm = this.fb.group({
    name: ['']
  })
  ngOnInit(): void {
  }
  createMenu(){
    const menu = {
      name: this.menuForm.controls['name'].value,
      restId: +this.auth.getRestId()
    }
    this.menuService.addMenu(menu).subscribe(res => {
      if(res === 400 || res === 403){
        alert('ההוספה נכשלה')
      }
      else{
        this.route.navigate(['menus-page']);
      }
    })
  }
  close(){
    
  }
}
