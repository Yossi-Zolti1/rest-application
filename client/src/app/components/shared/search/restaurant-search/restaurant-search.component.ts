import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Restaurant } from 'src/app/core/entities/restaurant';

@Component({
  selector: 'app-restaurant-search',
  templateUrl: './restaurant-search.component.html',
  styleUrls: ['./restaurant-search.component.css']
})
export class RestaurantSearchComponent implements OnInit {
  searchQuery!: string;
  restaurants!: Restaurant[];
  @Output() onFunctionCall: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }
  ngOnInit(): void {
  }
// Implement the logic to filter restaurants based on the search query
searchRestaurants() {
  this.onFunctionCall.emit(this.searchQuery);
  // Filter the 'restaurants' array based on the 'searchQuery'
  // Update the filtered restaurants list in your component
}
clearSearch(){
  this.searchQuery = ''
}
}
