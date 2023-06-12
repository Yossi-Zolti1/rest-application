import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/core/entities/menu';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-details-card',
  templateUrl: './menu-details-card.component.html',
  styleUrls: ['./menu-details-card.component.css']
})
export class MenuDetailsCardComponent implements OnInit {
  @Input() menu!: Menu
  @Input() menuId!: number;
  @Input() restId!: string;
  image!: string
  constructor() { }

  ngOnInit(): void {
    this.image = environment.baseUrl + this.menu.image!
  }

}
