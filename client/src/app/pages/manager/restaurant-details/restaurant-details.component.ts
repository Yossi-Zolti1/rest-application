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
  logoUrl!: string;
  restForm = this.fb.group({
    name: [''],
    street: [''],
    city: [''],
    phone:[''],
    kashrut:[''],
    type:[''],
    logo:[''],
  });
  get logo(){
    return this.restForm.get('logo')
  } 
  ngOnInit(): void {
    this.restDetailsService.getRestaurantDetails().subscribe(res => {
      if(res != 400){
        this.restaurant = res;
        this.restForm.patchValue({
          name: res.name,
          street: res.street,
          city: res.city,
          phone: res.phone,
          kashrut: res.kashrut,
          type: res.type,
          logo: res.logo
        });
        this.logoUrl = res.logo;
      }
    })
  }
  addRest(){
    this.restDetailsService.addRestaurant(this.restForm.value).subscribe(res => {
    })
  }
}
