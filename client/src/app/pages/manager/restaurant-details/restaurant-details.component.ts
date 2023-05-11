import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Restaurant } from 'src/app/core/restaurant';
import { RestaurantDetailsService } from 'src/app/services/restaurant-details.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  constructor(private restDetailsService: RestaurantDetailsService, public fb: FormBuilder) { }
  restaurant!: Restaurant;
  restForm = this.fb.group({
    name: [''],
    street: [''],
    city: [''],
    phone:[''],
    kashrut:[''],
    type:[''],
    logo:[''],
  }); 
  ngOnInit(): void {
    this.restDetailsService.getRestaurantDetails().subscribe(res => {
      if(res != 400){
        this.restaurant = res;
      }
    })
  }
  addRest(){
    this.restDetailsService.addRestaurant(this.restForm.value).subscribe(res => {
    })
  }

}
