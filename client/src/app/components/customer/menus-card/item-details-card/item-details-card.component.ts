import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/core/entities/menu';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-details-card',
  templateUrl: './item-details-card.component.html',
  styleUrls: ['./item-details-card.component.css']
})
export class ItemDetailsCardComponent implements OnInit {
  @Input() item!: Item
  @Input() itemId!: number
  image!: string
  constructor() { }

  ngOnInit(): void {
    this.image = environment.baseUrl + this.item.image!
  }

}
