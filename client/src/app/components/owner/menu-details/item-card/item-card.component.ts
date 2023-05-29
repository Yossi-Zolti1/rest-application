import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/core/entities/menu';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item;
  @Input() itemId!: number;
  constructor() { }

  ngOnInit(): void {
  }

}
