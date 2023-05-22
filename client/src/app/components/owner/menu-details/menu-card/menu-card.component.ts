import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/core/entities/menu';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {

  constructor() { }
  @Input() menu!: Menu;
  ngOnInit(): void {
  }

}
