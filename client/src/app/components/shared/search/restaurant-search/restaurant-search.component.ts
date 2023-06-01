import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/core/entities/restaurant';

@Component({
  selector: 'app-restaurant-search',
  templateUrl: './restaurant-search.component.html',
  styleUrls: ['./restaurant-search.component.css']
})
export class RestaurantSearchComponent implements OnInit {
  searchQuery!: string;
  restaurants!: Restaurant[];
  constructor() { }
  ngOnInit(): void {
  }
// Implement the logic to filter restaurants based on the search query
searchRestaurants() {
  // Filter the 'restaurants' array based on the 'searchQuery'
  // Update the filtered restaurants list in your component
}
clearSearch(){
  this.searchQuery = ''
}
}
