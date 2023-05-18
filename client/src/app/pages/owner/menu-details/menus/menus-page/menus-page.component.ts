import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menus-page',
  templateUrl: './menus-page.component.html',
  styleUrls: ['./menus-page.component.css']
})
export class MenusPageComponent implements OnInit {
  title: string = 'צור את התפריט שלך'
  buttonText: string = 'הוסף תפריט'
  constructor() { }

  ngOnInit(): void {
  }
  createMenu(isOpen: boolean){
    if(isOpen)console.log('hi')
  }
}