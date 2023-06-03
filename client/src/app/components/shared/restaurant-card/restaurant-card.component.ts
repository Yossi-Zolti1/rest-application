import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/core/entities/restaurant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit {
  @Input() restaurant!: Restaurant
  logoUrl!: string
  
  constructor() { }

  ngOnInit(): void {
    this.logoUrl = environment.baseUrl + this.restaurant.logo!
  }

}
