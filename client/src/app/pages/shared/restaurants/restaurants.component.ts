import { Component, Input, OnInit } from '@angular/core';
import { RestaurantDetailsService } from 'src/app/services/restaurant-details.service';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/core/entities/restaurant';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  page: number = 1;
  restaurants: Restaurant[] = [];
  queryString!: string | null

  constructor(private restService: RestaurantDetailsService) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    if(this.queryString){
      this.restService.getrestByName(this.queryString).subscribe(res => {
        this.restaurants = res;
      })
    }
    else{
      this.restService.getAllRestaurants(this.page)
      .subscribe(restaurants => {
        if(restaurants.length > 0){
          this.restaurants = this.restaurants.concat(restaurants);
        }
      });
    }
  }
  addQueryString(queryString: string){
    this.restService.getrestByName(queryString).subscribe(res => {
      this.restaurants = res;
    })
 }
  onScroll(): void {
    this.page++;
    this.loadRestaurants();
  }
}
