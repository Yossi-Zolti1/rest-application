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
  formData: FormData = new FormData();
  constructor(public fb: FormBuilder, private menuService: MenuDetailsService, private route: Router
    ,private auth: AuthService) { }
  menuForm = this.fb.group({
    name: ['']
  })
  ngOnInit(): void {
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
  onFileSelected(e: any) {
    this.formData.append('my', e.target.files[0])
  }
}
